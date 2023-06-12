﻿/*
이 소스코드는 js로 kotlin의 LiveData를 구현한 소스코드입니다.
작성자: 환류상
 */
const LiveData = class {
    #data;
    #observer;
    #allowed;
    set value(data) {
        if (this.#allowed && this.#allowed.name.toLocaleLowerCase() !== (Array.isArray(data) ? "array" : typeof data)) throw new TypeError(`invalid type of data. Data must be of type ${this.#allowed.name}.`);
        const isChanged = (JSON.stringify(data) != JSON.stringify(this.#data)) ? true : false;
        this.#data = data;
        if (isChanged && typeof this.#observer == "function") this.#observer();
    }
    get value() {
        return (Array.isArray(this.#data)) ? [...this.#data] : (typeof this.#data == "object") ? Object.assign({}, this.#data) : this.#data;
    }
    /**
     * @type {(observer: Function) => LiveData}
     */
    registObserver = observer => {
        this.#observer = observer;
        return this;
    }
    /**
     * @deprecated This can cause unintended behavior.
     * @type {() => void}
     */
    dispatchObserver = () => this.#observer();
    /**
     * @type {(data: Any, allowed: Type) => LiveData}
     */
    constructor(data, allowed) {
        this.#data = data;
        this.#allowed = allowed;
    }
}
const LiveDataManager = class {
    #editable;
    #resource;
    value = (id, data) => (typeof data !== "undefined") ? this.#resource[id].value = data : this.#resource[id].value;
    get id() {
        if (!this.#editable) throw new SyntaxError(`This LiveDataManager cannot be accessed or modified externally.`)
        return this.#resource;
    }
    toArray = () => Object.values(this.#resource).map(inner => inner.value);
    toObject = () => Object.entries(this.#resource).reduce((obj, [key, value]) => {
        obj[key] = value.value;
        return obj;
      }, {});
    /**
     * @type {(livedataObject: Object, editable?: boolean) => LiveDataManager}
     */
    constructor(livedataObject, editable = true) {
        if ("object" !== (Array.isArray(livedataObject) ? "array" : typeof livedataObject)) throw new TypeError(`invalid type of livedataObject. livedataObject must be of type Object. (livedataObject: ${Array.isArray(livedataObject) ? "array" : typeof livedataObject})`);
        this.#editable = editable;
        this.#resource = Object.entries(livedataObject).reduce((obj, [key, value]) => { 
            if (!(value instanceof LiveData)) throw new TypeError(`invalid type of ${key}'s value. ${key}'s value must be of instance LiveData`)
            else obj[key] = value;
            return obj;
        }, {});
    }
}
const Binder = class {
    static #bindlist = {};
    static #synclist = {};
    static #innerSync = (obj, expression) => {
        const subStrings = obj.attributes.exp.value.split("->")[0].split(" ").filter(value => value != "");
        let returnString = expression;
        for (let match of returnString.match(/\{(.+?)\}/g)) {
            let replaced = match;
            for (let subString of subStrings) replaced = replaced.replaceAll(subString, `__#${subString}__`);
            returnString = returnString.replace(match, `${replaced}`);
        }
        for (let subString of subStrings) {
            const parsing = ["INPUT", "TEXTAREA"].includes(this.#bindlist[subString].nodeName) ? this.#bindlist[subString].value : this.#bindlist[subString].innerText;
            if (parsing.indexOf("$") != -1) returnString = returnString.replaceAll(`__#${subString}__`, Math[parsing.split("$")[1]]);
            else if (isNaN(parsing) || parsing == "" || /^0[0-9]/g.test(parsing.trim().replace("-", "").replace("+", ""))) returnString = returnString.replaceAll(`__#${subString}__`, `"${parsing.replace(/"/g, '\\"')}"`.replaceAll("{", "").replaceAll("}", ""))
            else returnString = returnString.replaceAll(`__#${subString}__`, parsing);
        }
        returnString = returnString.replaceAll(/\{([^{}]+)\}/g, (match, group) => {
            const result = eval(group);
            return result;
        });
        if (["INPUT", "TEXTAREA"].includes(obj.nodeName)) obj.value = returnString.split("->")[1];
        else obj.innerText = returnString.split("->")[1];
    }
    static _set = () => {
        this.#synclist = {};
        for (let element of document.querySelectorAll("[var]")) {
            const varValues = element.attributes.var.value.split("=");
            this.#bindlist[varValues[0]] = element;
            if (varValues[1] && varValues[1] != "") {
                if (["INPUT", "TEXTAREA"].includes(element.nodeName)) element.value = varValues[1];
                else obj.innerText = varValues[1];
            }
            element.addEventListener('input', () => this.sync(element));
        }
        for (let element of document.querySelectorAll("[exp]")) {
            for (let name of element.attributes.exp.value.split("->")[0].split(" ").filter(value => value != "")) {
                this.#synclist[name] ? this.#synclist[name].push(element) : this.#synclist[name] = [element];
                this.#innerSync(element, element.attributes.exp.value)
            }
        }
    }
    static sync = obj => {
        const varValue = obj.attributes.var.value.split("=")[0];
        if (typeof this.#synclist[varValue] == "object") for (let element of this.#synclist[varValue]) this.#innerSync(element, element.attributes.exp.value);
    }
    static find = id => this.#bindlist[id];
}
document.body.addEventListener('DOMNodeInserted', e => {
    if (e.target instanceof HTMLElement) Binder._set();
});
Binder._set();

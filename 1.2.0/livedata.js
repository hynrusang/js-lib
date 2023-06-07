/*
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
/**
 * @description This class is used indirectly to implement the var and exp attribute of HtmlElement.
 */
const _Binder = class {
    static #bindlist = {};
    static #synclist = {};
    static #innerSync = (obj, expression) => {
        const subStrings = obj.attributes.exp.value.split("->")[0].split(" ").filter(value => value != "");
        let returnString = expression;
        for (let subString of subStrings) returnString = returnString.replaceAll(subString, `__#${subString}__`);
        for (let subString of subStrings) {
            const parsing = ["INPUT", "TEXTAREA"].includes(this.#bindlist[subString].nodeName) ? this.#bindlist[subString].value : this.#bindlist[subString].innerText;
            returnString = returnString.replaceAll(`__#${subString}__`, (isNaN(parsing) || parsing == "" || /0[0-9.]+$/g.test(parsing)) ? `"${parsing.replace(/"/g, '\\"')}"` : parsing);
        }
        returnString = returnString.replaceAll(/\{([^{}]+)\}/g, (match, group) => {
            const result = eval(group);
            return result;
        });
        if (["INPUT", "TEXTAREA"].includes(obj.nodeName)) obj.value = returnString.split("->")[1];
        else obj.innerText = returnString.split("->")[1];
    }
    static set = () => {
        this.#synclist = {};
        for (let element of [...document.querySelectorAll("[var]"), ...document.querySelectorAll("[exp]")]) {
            if (element.nodeName != "#text") {
                if (element.attributes.var) {
                    this.#bindlist[element.attributes.var.value] = element;
                    element.addEventListener('input', () => this.sync(element));
                } else if (element.attributes.exp) {
                    for (let name of element.attributes.exp.value.split("->")[0].split(" ").filter(value => value != "")) {
                        if (this.#synclist[name]) this.#synclist[name].push(element);
                        else this.#synclist[name] = [element];
                        this.#innerSync(element, element.attributes.exp.value)
                    }
                }
            }
        }
    }
    static sync = obj => {
        for (let element of this.#synclist[obj.attributes.var.value]) this.#innerSync(element, element.attributes.exp.value);
    }
}
document.body.addEventListener('DOMNodeInserted', e => {
    if (e.target instanceof HTMLElement) _Binder.set();
});
document.body.addEventListener('DOMNodeRemoved', () => _Binder.set());
_Binder.set();

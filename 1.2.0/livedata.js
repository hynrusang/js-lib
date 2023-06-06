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
const Binder = class {
    static #bindlist = {};
    static #synclist = {};
    static regist = elements => {
        for (let element of elements) {
            if (element.nodeName != "#text") {
                if (element.attributes.var) {
                    const name = element.attributes.var.value;
                    if (this.#bindlist[name]) this.#bindlist[name].push(element);
                    else this.#bindlist[name] = [element];
                    element.value = this.#bindlist[name][0].value
                    element.addEventListener('input', () => this.reBind(element, element.attributes.var.value));
                } else if (element.attributes.sync) {
                    const expression = element.attributes.sync.value;
                    for (let name of expression.match(/{([^}]+)}/g).map(value => value.slice(1, -1)).filter(value => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value))) {
                        if (this.#synclist[name]) this.#synclist[name].push(element);
                        else this.#synclist[name] = [element];
                        this.reSync(element, element.attributes.sync.value)
                    }
                }
            }
        }
    }
    /**
     * @type {(obj: HTMLElement) => void}
     */
    static reBind = (obj, name) => {
        for (let element of this.#bindlist[name]) element.value = obj.value;
        if (this.#synclist[name]) for (let obj of this.#synclist[name]) this.reSync(obj, obj.attributes.sync.value)
    }
    static reSync = (obj, expression) => {
        let returnString = expression
        for (let subString of expression.match(/{([^}]+)}/g).filter(value => this.#bindlist[value.slice(1, -1)]).map(value => value.slice(1, -1))) returnString = returnString.replaceAll(subString, Number.isNaN(parseInt(this.#bindlist[subString][0].value)) ? `"${this.#bindlist[subString][0].value}"` : this.#bindlist[subString][0].value);
        returnString = returnString.replaceAll(/\{([^{}]+)\}/g, (match, group) => {
            const result = eval(group);
            return result;
        });
        if (obj.nodeName == "INPUT") obj.value = returnString
        else obj.innerText = returnString;
    }
}
Binder.regist([...scan("![var]"), ...scan("![sync]")]);
new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            const addedElements = mutation.addedNodes;
            if (addedElements.length > 0) {
                Binder.regist(addedElements);
            }
        }
    }
}).observe(document.body, { childList: true });
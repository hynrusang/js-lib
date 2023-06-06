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
    static #uselist = {};
    /**
     * @type {(obj: HTMLElement) => void}
     */
    static bind = (obj, name) => {
        this.#bindlist[name] = obj.value;
        if (this.#uselist[name]) {
            for (let usedata of this.#uselist[name]) this._parsing(usedata)
            this.#uselist[name].value = "true"
        }
        console.log(this.#bindlist)
        console.log(this.#uselist)
    }
    static use = (obj, expression) => {
        for (let variable of expression.match(/{([^}]+)}/g).map(value => value.slice(1, -1)).filter(item => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(item))) {
            if (this.#uselist[variable]) this.#uselist[variable].push(obj);
            else this.#uselist[variable] = [obj];
            this._parsing(obj)
        }
    }
    static _parsing = obj => {
        const expression = obj.attributes.use.value;
        obj.value = expression.replaceAll(/{([^}]+)}/g, (match, group) => {
            return this.#bindlist[group] || match;
        });
    }
}
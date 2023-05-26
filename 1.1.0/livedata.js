/*
이 소스코드는 js로 kotlin의 LiveData를 구현한 소스코드입니다.
절대로 무단으로 가져가지 마시기 바랍니다.
작성자: 환류상
 */
const LiveData = class {
    #data;
    #observer;
    #allowed;
    set value(data) {
        if (this.#allowed && this.#allowed.name.toLocaleLowerCase() !== (Array.isArray(data) ? "array" : typeof data)) throw new TypeError(`Invalid type of data. Data must be of type ${this.#allowed.name}.`);
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
    constructor(data, allowed) {
        this.#data = data;
        this.#allowed = allowed;
    }

    /**
     * @deprecated This method is not supported starting with livedata 1.2.0. use new LiveData().value setter instead.
     * @type {(data: Any) => LiveData}
     */
    set = data => {
        if (this.#allowed.name.toLocaleLowerCase() !== (Array.isArray(data) ? "array" : typeof data)) throw new TypeError(`invalid type of data. Data must be of type ${this.#allowed.name}.`);
        const isChanged = (JSON.stringify(data) != JSON.stringify(this.#data)) ? true : false;
        this.#data = data;
        if (isChanged && typeof this.#observer == "function") this.#observer();
    }
    /**
     * @deprecated This method is not supported starting with livedata 1.2.0. use new LiveData().value getter instead.
     * @type {() => Any}
     */
    get = () => (Array.isArray(this.#data)) ? [...this.#data] : (typeof this.#data == "object") ? Object.assign({}, this.#data) : this.#data;
}
const LiveDataManager = class {
    #editable;
    #resource;
    value = (id, value) => {
        if (value) {
            this.#resource[id].value = value;
        } else return this.#resource[id].value
    }
    get id() {
        if (!this.#editable) throw new SyntaxError(`This LiveDataManager cannot be accessed or modified externally.`)
        return this.#resource;
    }
    toArray = () => {
        const __$$RETURNOBJECT = [];
        for (let value of Object.values(this.#resource)) __$$RETURNOBJECT.push(value.value);
        return __$$RETURNOBJECT;
    };
    toObject = () => {
        const __$$RETURNOBJECT = {};
        for (let [key, value] of Object.entries(this.#resource)) __$$RETURNOBJECT[key] = value.value;
        return __$$RETURNOBJECT;
    };
    constructor(livedataObject, editable = true) {
        if ("object" !== (Array.isArray(livedataObject) ? "array" : typeof livedataObject)) throw new TypeError("invalid type of data. Data must be of type Object.");
        this.#editable = editable;
        this.#resource = {};
        for (let [key, value] of Object.entries(livedataObject)) {
            if (!(value instanceof LiveData)) throw new TypeError(`invalid type of ${key}'s value. ${key}'s value must be of instance LiveData`)
            else this.#resource[key] = value;
        }
    }
}
/**
 * @deprecated This method is not supported starting with livedata 1.2.0. use LiveDataManager.toObject instead.
 * @type {(json: Object) => Object}
 */
JSON.unlivedata = json => {
    let data = {};
    for (let key of Object.keys(json)) data[key] = (json[key] instanceof LiveData) ? json[key].value : json[key];
    return data;
}
/**
 * @deprecated This method is not supported starting with livedata 1.2.0. use LiveDataManager.toArray instead.
 * @type {(json: Object) => Object}
 */
Array.unlivedata = array => {
    let data = []
    for (let inner of array) data.push((inner instanceof LiveData) ? inner.value : inner);
    return data;
}

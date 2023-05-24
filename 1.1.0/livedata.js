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
    #resource;
    set id(livedataObject) {
        if ("object" !== (Array.isArray(livedataObject) ? "array" : typeof livedataObject)) throw new TypeError(`invalid type of data. Data must be of type ${this.#allowed.name}.`);
        if (!(Object.values(livedataObject)[0] instanceof LiveData)) throw new TypeError(`invalid type of data's value. Data's value must be of instance LiveData`);
        this.#resource[Object.keys(livedataObject)[0]] = Object.values(livedataObject)[0]
    }
    get id() {
        return this.#resource;
    }
    toArray;
    toObject;
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

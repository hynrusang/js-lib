/*
이 소스코드는 js로 kotlin의 LiveData를 구현한 소스코드입니다.
절대로 무단으로 가져가지 마시기 바랍니다.
작성자: 환류상
 */
const LiveData = class {
    #data;
    #observer;
    /**
     * @deprecated This method is not supported starting with livedata 1.1.0. use new LiveData().value = data in 1.1.0 instead.
     * @type {(data: Any) => LiveData}
     */
    set = data => {
        const isChanged = (JSON.stringify(data) != JSON.stringify(this.#data)) ? true : false;
        this.#data = data;
        if (isChanged && typeof this.#observer == "function") this.#observer();
        return this;
    }
    /**
     * @deprecated This method is not supported starting with livedata 1.1.0. use new LiveData().value in 1.1.0 instead.
     * @type {() => Any}
     */
    get = () => [...[this.#data]][0];
    /**
     * @type {(observer: Function) => LiveData}
     */
    registObserver = observer => {
        this.#observer = observer;
        return this;
    }
    constructor(data) {
        this.#data = data;
    }
}
JSON.unlivedata = json => {
    let data = {};
    for (let key of Object.keys(json)) data[key] = (json[key] instanceof LiveData) ? json[key].get() : json[key];
    return data;
}
Array.unlivedata = array => {
    let data = []
    for (let value of array) data.push((value instanceof LiveData) ? value.get() : value);
    return data;
}
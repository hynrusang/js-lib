/*
이 소스코드는 기존의 js에 더 유용한 기능을 추가합니다.
절대로 무단으로 가져가지 마시기 바랍니다.
작성자: 환류상
 */
/**
 * @type {(target: any, Class: any) => boolean}
 */
const is = (target, Class) => (typeof target == "object") ? (target instanceof Class) : (typeof target == Class.toString().split(" ")[1].split("(")[0].toLocaleLowerCase());
/**
 * @type {(millisecond: number) => Promise<>}
 */
const wait = millisecond => new Promise(code => setTimeout(code, millisecond));
/**
 * @deprecated This function is not supported starting with advanced 1.2.0. Use indexOf() prototype instead.
 * @type {{
 * (parent: any[], child: any) => number
 * (parent: HTMLElement, child: HTMLElement) => number
 * }}
 */
const getIndex = (parent, child) => Array.prototype.indexOf.call((parent.nodeName != null) ? parent.children : parent, child);
HTMLElement.prototype.indexOf = function (searchElement, fromIndex) { return Array.from(this.children).indexOf(searchElement, fromIndex); } 
NodeList.prototype.indexOf = function (searchElement, fromIndex) { return Array.from(this).indexOf(searchElement, fromIndex); }
String.prototype.isEmpty = function (...ignore) { 
    let __$$TEMPSTRING = this;
    for (let __$$IGNORE of ignore) __$$TEMPSTRING = __$$TEMPSTRING.replaceAll(__$$IGNORE, "");
    return __$$TEMPSTRING.length === 0;
}
Array.prototype.isEmpty = function (...ignore) { 
    return this.filter(item => !ignore.includes(item)).length === 0;
}
Array.prototype.add = function (data) { 
    this.push(data);
    return this;
}
Array.prototype.remove = function (data) { 
    const index = this.indexOf(data);
    if (index > -1) this.splice(index, 1);
    return this;
}

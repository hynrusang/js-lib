﻿/*
기존의 js를 확장해서 더 융통성있게 사용할 수 있도록 해줍니다.
작성자: 환류상
 */
/**
 * @type {(target: any, Class: any) => boolean}
 */
const is = (target, Class) => (typeof target === "object") ? (target instanceof Class) : (typeof target === Class.name.toLocaleLowerCase());
/**
 * @type {(millisecond: number) => Promise<>}
 */
const wait = millisecond => new Promise(code => setTimeout(code, millisecond));
/**
 * @deprecated This function is not supported starting with 1.2.0. Use indexOf() prototype instead.
 * @type {{
 * (parent: any[], child: any) => number
 * (parent: HTMLElement, child: HTMLElement) => number
 * }}
 */
const getIndex = (parent, child) => {
    console.log("%cThis function is not supported starting with 1.2.0.\nUse indexOf() prototype instead.", "color: red")
    Array.prototype.indexOf.call((parent.nodeName != null) ? parent.children : parent, child);
}
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
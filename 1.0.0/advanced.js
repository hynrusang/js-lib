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
 * @type {{
* (parent: any[], child: any) => number
* (parent: HTMLElement, child: HTMLElement) => number
* }}
*/
const getIndex = (parent, child) => Array.prototype.indexOf.call((parent.nodeName != null) ? parent.children : parent, child);
String.prototype.isEmpty = function () { return (this.length == 0); }
Array.prototype.isEmpty = function () { return (this.length == 0); }
Array.prototype.add = function (data) { 
    this.push(data);
    return this;
}
Array.prototype.remove = function (data) { 
    const index = this.indexOf(data);
    if (index > -1) this.splice(index, 1);
    return this;
}
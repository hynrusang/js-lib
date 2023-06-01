﻿/*
이 소스코드는 js로 html을 빠르고 간편하게 만들기 위해 작성되었습니다.
작성자: 환류상
 */
class SecurityError extends Error {
    constructor(massage) {
        super(massage);
        this.name = "Security Error";
    }
}
class DomDefault {
    /**
     * @type {HTMLElement}
     */
    _node;
    /**
     * @type {(num: number) => HTMLElement}
     */
    children = num => this._node.children[num] ? new Dom(this._node.children[num]) : null;
    /**
     * @type {(...dom: DomDefault | DomDefault[]) => DomDefault}
     */
    add = (...dom) => {
        for (let pdom of dom) {
            if (Array.isArray(pdom)) {
                for (let cdom of pdom) this._node.appendChild(cdom._node);
            } else this._node.appendChild(pdom._node);
        }
        return this;
    }
    /**
     * @type {(num: number) => DomDefault}
     */
    remove = num => { 
        this._node.removeChild(this.children(num)); 
        return this;
    }
    /**
     * @type {(node: string | HTMLElement) => DomDefault}
     */
    constructor(node = "div") { this._node = is(node, "string") ? document.createElement(node) : node; }
}

class DomExpert extends DomDefault {
    /**
     * @type {(count: number) => DomExpert[]}
     */
    copy = count => {
        const tempbox = [];
        for (let i = 0; i < count; i++) tempbox.push($(this._node.cloneNode(true)));
        return tempbox;
    }
    /**
     * @type {(...dom?: DomExpert | DomExpert[]) => DomExpert}
     */
    reset = (...dom) => {
        this._node.innerHTML = "";
        this.add(...dom);
        return this;
    }
    /**
     * @type {(additional: Object?) => DomExpert}
     */
    set = additional => {
        if (typeof additional === 'object') {
            for (const [key, value] of Object.entries(additional)) {
                if (["innerHTML", "html"].includes(key)) this._node.innerHTML = value
                else if (["innerText", "text"].includes(key)) this._node.innerText = value
                else if (key.indexOf("on") != -1 || key == "async") this._node[key] = value
                else this._node.setAttribute(key, value);
            }
        } else throw new Error('Additional parameter must be an {key: value} object');
        return this;
    };
    /**
     * @type {(node: string | HTMLElement, additional: Object?) => DomExpert}
     */
    constructor(node, additional) {
        super(node);
        this.set(additional);
    }
}
/**
 * @type {(node: string | HTMLElement, additional?: Object) => DomExpert}
 */
const $ = (node, additional) => { return new DomExpert(node, additional); };
/**
 * @type {(target: any, classname: string) => boolean}
 */
const is = (target, classname) => { return typeof target === classname; };
/**
 * @type {(millisecond: number) => Promise<>}
 */
const wait = millisecond => { return new Promise(code => setTimeout(code, millisecond)); }
/**
 * Suggested by chatGPT.
 * @type {{
 * (parent: any[], child: any) => number
 * (parent: HTMLElement, child: HTMLElement) => number
 * }}
 */
const getIndex = (parent, child) => { return parent.nodeName != null ? Array.prototype.indexOf.call(parent.children, child) : Array.prototype.indexOf.call(parent, child); };
/** 
 * @type {{
* (selector: `!${string}`) => NodeListOf<HTMLElement>;
* (selector: string) => HTMLElement
* (selector: HTMLElement) => HTMLElement
* }}
*/
const scan = selector => { return is(selector, "string") ? selector.in("!") ? document.querySelectorAll(selector.split("!")[1]) : document.querySelector(selector) : selector; }
/**
 * @type {{
* (selector: `!${string}`) => DomExpert[]
* (selector: string) => DomExpert
* (selector: HTMLElement) => DomExpert
* }}
*/
const snipe = selector => {
   const temp = (is(selector, "string") && selector.in("!")) ? [] : $(scan(selector));
   if (is(temp, "object")) for (let i = 0; i < scan(selector).length; i++) temp.push($(scan(selector)[i]));
   return temp;
}
/**
 * @type {(jhpath: string) => void}
 * @throws {SecurityError}
 */
const loading  = jhpath => {
    const REQUEST = new XMLHttpRequest();
    if (jhpath.in("http")) throw new SecurityError("loading 함수로 다른 웹사이트의 htm.js를 로딩할 수 없습니다.");
    else {
        REQUEST.open('GET', `${jhpath}.htm.js`);
        REQUEST.send();
        REQUEST.onreadystatechange = (e => { (e.target.readyState == 4) ? eval(REQUEST.response) : null});
    }
}
String.prototype.isEmpty = function () { return (this.length == 0); }
Array.prototype.isEmpty = function () { return (this.length == 0); }
String.prototype.count = function (data) { return (this.split(data).length - 1); }
Array.prototype.count = function (data) {
    let count = 0;
    for (let i = 0; i < this.length; i++) if (this[i] == data) count++;
    return count;
}
String.prototype.in = function (data) { return (this.indexOf(data) != -1); }
Array.prototype.in = function (data) { return (this.indexOf(data) != -1); }
String.prototype.last = function () { return this.slice(-1); }
Array.prototype.last = function () { return this[this.length - 1]; }

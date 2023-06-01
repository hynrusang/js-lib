/*
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
 * (selector: `!${string}a`) => NodeListOf<HTMLAnchorElement>;
 * (selector: `!${string}area`) => NodeListOf<HTMLAreaElement>;
 * (selector: `!${string}audio`) => NodeListOf<HTMLAudioElement>;
 * (selector: `!${string}base`) => NodeListOf<HTMLBaseElement>;
 * (selector: `!${string}blockquote`) => NodeListOf<HTMLQuoteElement>;
 * (selector: `!${string}body`) => NodeListOf<HTMLBodyElement>;
 * (selector: `!${string}br`) => NodeListOf<HTMLBRElement>;
 * (selector: `!${string}button`) => NodeListOf<HTMLButtonElement>;
 * (selector: `!${string}canvas`) => NodeListOf<HTMLCanvasElement>;
 * (selector: `!${string}caption`) => NodeListOf<HTMLTableCaptionElement>;
 * (selector: `!${string}col`) => NodeListOf<HTMLTableColElement>;
 * (selector: `!${string}colgroup`) => NodeListOf<HTMLTableColElement>;
 * (selector: `!${string}data`) => NodeListOf<HTMLDataElement>;
 * (selector: `!${string}datalist`) => NodeListOf<HTMLDataListElement>;
 * (selector: `!${string}del`) => NodeListOf<HTMLModElement>;
 * (selector: `!${string}details`) => NodeListOf<HTMLDetailsElement>;
 * (selector: `!${string}dialog`) => NodeListOf<HTMLDialogElement>;
 * (selector: `!${string}div`) => NodeListOf<HTMLDivElement>;
 * (selector: `!${string}dl`) => NodeListOf<HTMLDListElement>;
 * (selector: `!${string}embed`) => NodeListOf<HTMLEmbedElement>;
 * (selector: `!${string}fieldset`) => NodeListOf<HTMLFieldSetElement>;
 * (selector: `!${string}form`) => NodeListOf<HTMLFormElement>;
 * (selector: `!${string}h1`) => NodeListOf<HTMLHeadingElement>;
 * (selector: `!${string}h2`) => NodeListOf<HTMLHeadingElement>;
 * (selector: `!${string}h3`) => NodeListOf<HTMLHeadingElement>;
 * (selector: `!${string}h4`) => NodeListOf<HTMLHeadingElement>;
 * (selector: `!${string}h5`) => NodeListOf<HTMLHeadingElement>;
 * (selector: `!${string}h6`) => NodeListOf<HTMLHeadingElement>;
 * (selector: `!${string}head`) => NodeListOf<HTMLHeadElement>;
 * (selector: `!${string}hr`) => NodeListOf<HTMLHRElement>;
 * (selector: `!${string}html`) => NodeListOf<HTMLHtmlElement>;
 * (selector: `!${string}iframe`) => NodeListOf<HTMLIFrameElement>;
 * (selector: `!${string}img`) => NodeListOf<HTMLImageElement>;
 * (selector: `!${string}input`) => NodeListOf<HTMLInputElement>;
 * (selector: `!${string}ins`) => NodeListOf<HTMLModElement>;
 * (selector: `!${string}label`) => NodeListOf<HTMLLabelElement>;
 * (selector: `!${string}legend`) => NodeListOf<HTMLLegendElement>;
 * (selector: `!${string}li`) => NodeListOf<HTMLLIElement>;
 * (selector: `!${string}link`) => NodeListOf<HTMLLinkElement>;
 * (selector: `!${string}map`) => NodeListOf<HTMLMapElement>;
 * (selector: `!${string}menu`) => NodeListOf<HTMLMenuElement>;
 * (selector: `!${string}meta`) => NodeListOf<HTMLMetaElement>;
 * (selector: `!${string}meter`) => NodeListOf<HTMLMeterElement>;
 * (selector: `!${string}object`) => NodeListOf<HTMLObjectElement>;
 * (selector: `!${string}ol`) => NodeListOf<HTMLOListElement>;
 * (selector: `!${string}optgroup`) => NodeListOf<HTMLOptGroupElement>;
 * (selector: `!${string}option`) => NodeListOf<HTMLOptionElement>;
 * (selector: `!${string}output`) => NodeListOf<HTMLOutputElement>;
 * (selector: `!${string}p`) => NodeListOf<HTMLParagraphElement>;
 * (selector: `!${string}picture`) => NodeListOf<HTMLPictureElement>;
 * (selector: `!${string}pre`) => NodeListOf<HTMLPreElement>;
 * (selector: `!${string}progress`) => NodeListOf<HTMLProgressElement>;
 * (selector: `!${string}q`) => NodeListOf<HTMLQuoteElement>;
 * (selector: `!${string}script`) => NodeListOf<HTMLScriptElement>;
 * (selector: `!${string}select`) => NodeListOf<HTMLSelectElement>;
 * (selector: `!${string}slot`) => NodeListOf<HTMLSlotElement>;
 * (selector: `!${string}source`) => NodeListOf<HTMLSourceElement>;
 * (selector: `!${string}span`) => NodeListOf<HTMLSpanElement>;
 * (selector: `!${string}style`) => NodeListOf<HTMLStyleElement>;
 * (selector: `!${string}table`) => NodeListOf<HTMLTableElement>;
 * (selector: `!${string}tbody`) => NodeListOf<HTMLTableSectionElement>;
 * (selector: `!${string}td`) => NodeListOf<HTMLTableCellElement>
 * (selector: `!${string}template`) => NodeListOf<HTMLTemplateElement>
 * (selector: `!${string}textarea`) => NodeListOf<HTMLTextAreaElement>
 * (selector: `!${string}tfoot`) => NodeListOf<HTMLTableSectionElement>
 * (selector: `!${string}th`) => NodeListOf<HTMLTableCellElement>
 * (selector: `!${string}thead`) => NodeListOf<HTMLTableSectionElement>
 * (selector: `!${string}time`) => NodeListOf<HTMLTimeElement>
 * (selector: `!${string}title`) => NodeListOf<HTMLTitleElement>
 * (selector: `!${string}tr`) => NodeListOf<HTMLTableRowElement>
 * (selector: `!${string}track`) => NodeListOf<HTMLTrackElement>
 * (selector: `!${string}ul`) => NodeListOf<HTMLUListElement>
 * (selector: `!${string}video`) => NodeListOf<HTMLVideoElement>
 * (selector: `${string}a`) => HTMLAnchorElement;
 * (selector: `${string}area`) => HTMLAreaElement;
 * (selector: `${string}audio`) => HTMLAudioElement;
 * (selector: `${string}base`) => HTMLBaseElement;
 * (selector: `${string}blockquote`) => HTMLQuoteElement;
 * (selector: `${string}body`) => HTMLBodyElement;
 * (selector: `${string}br`) => HTMLBRElement;
 * (selector: `${string}button`) => HTMLButtonElement;
 * (selector: `${string}canvas`) => HTMLCanvasElement;
 * (selector: `${string}caption`) => HTMLTableCaptionElement;
 * (selector: `${string}col`) => HTMLTableColElement;
 * (selector: `${string}colgroup`) => HTMLTableColElement;
 * (selector: `${string}data`) => HTMLDataElement;
 * (selector: `${string}datalist`) => HTMLDataListElement;
 * (selector: `${string}del`) => HTMLModElement;
 * (selector: `${string}details`) => HTMLDetailsElement;
 * (selector: `${string}dialog`) => HTMLDialogElement;
 * (selector: `${string}div`) => HTMLDivElement;
 * (selector: `${string}dl`) => HTMLDListElement;
 * (selector: `${string}embed`) => HTMLEmbedElement;
 * (selector: `${string}fieldset`) => HTMLFieldSetElement;
 * (selector: `${string}form`) => HTMLFormElement;
 * (selector: `${string}h1`) => HTMLHeadingElement;
 * (selector: `${string}h2`) => HTMLHeadingElement;
 * (selector: `${string}h3`) => HTMLHeadingElement;
 * (selector: `${string}h4`) => HTMLHeadingElement;
 * (selector: `${string}h5`) => HTMLHeadingElement;
 * (selector: `${string}h6`) => HTMLHeadingElement;
 * (selector: `${string}head`) => HTMLHeadElement;
 * (selector: `${string}hr`) => HTMLHRElement;
 * (selector: `${string}html`) => HTMLHtmlElement;
 * (selector: `${string}iframe`) => HTMLIFrameElement;
 * (selector: `${string}img`) => HTMLImageElement;
 * (selector: `${string}input`) => HTMLInputElement;
 * (selector: `${string}ins`) => HTMLModElement;
 * (selector: `${string}label`) => HTMLLabelElement;
 * (selector: `${string}legend`) => HTMLLegendElement;
 * (selector: `${string}li`) => HTMLLIElement;
 * (selector: `${string}link`) => HTMLLinkElement;
 * (selector: `${string}map`) => HTMLMapElement;
 * (selector: `${string}menu`) => HTMLMenuElement;
 * (selector: `${string}meta`) => HTMLMetaElement;
 * (selector: `${string}meter`) => HTMLMeterElement;
 * (selector: `${string}object`) => HTMLObjectElement;
 * (selector: `${string}ol`) => HTMLOListElement;
 * (selector: `${string}optgroup`) => HTMLOptGroupElement;
 * (selector: `${string}option`) => HTMLOptionElement;
 * (selector: `${string}output`) => HTMLOutputElement;
 * (selector: `${string}p`) => HTMLParagraphElement;
 * (selector: `${string}picture`) => HTMLPictureElement;
 * (selector: `${string}pre`) => HTMLPreElement;
 * (selector: `${string}progress`) => HTMLProgressElement;
 * (selector: `${string}q`) => HTMLQuoteElement;
 * (selector: `${string}script`) => HTMLScriptElement;
 * (selector: `${string}select`) => HTMLSelectElement;
 * (selector: `${string}slot`) => HTMLSlotElement;
 * (selector: `${string}source`) => HTMLSourceElement;
 * (selector: `${string}span`) => HTMLSpanElement;
 * (selector: `${string}style`) => HTMLStyleElement;
 * (selector: `${string}table`) => HTMLTableElement;
 * (selector: `${string}tbody`) => HTMLTableSectionElement;
 * (selector: `${string}td`) => HTMLTableCellElement;
 * (selector: `${string}template`) => HTMLTemplateElement;
 * (selector: `${string}textarea`) => HTMLTextAreaElement;
 * (selector: `${string}tfoot`) => HTMLTableSectionElement;
 * (selector: `${string}th`) => HTMLTableCellElement;
 * (selector: `${string}thead`) => HTMLTableSectionElement;
 * (selector: `${string}time`) => HTMLTimeElement;
 * (selector: `${string}title`) => HTMLTitleElement;
 * (selector: `${string}tr`) => HTMLTableRowElement;
 * (selector: `${string}track`) => HTMLTrackElement;
 * (selector: `${string}ul`) => HTMLUListElement;
 * (selector: `${string}video`) => HTMLVideoElement;
 * (selector: `!${string}`) => NodeListOf<HTMLElement>
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

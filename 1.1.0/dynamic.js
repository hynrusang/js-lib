/*
이 소스코드는 js로 html을 빠르고 간편하게 만들기 위해 작성되었습니다.
절대로 무단으로 가져가지 마시기 바랍니다.
작성자: 환류상
 */
/**
 * @deprecated This class is not supported starting with dynamic 1.2.0. Use Fragment.launch() instead.
 */
class SecurityError extends Error {
    constructor(massage) {
        super(massage);
        this.name = "Security Error";
    }
}
const Dom = class {
    /**
     * @deprecated this property was change to private. use node getter instead.
     * @type {HTMLElement}
     */
    _node;
    /**
     * @type {() => HTMLElement}
     */
    get node() {
        return this._node;
    }
    /**
     * @type {(num: number) => HTMLElement}
     */
    children = num => this._node.children[num] ? new Dom(this._node.children[num]) : null;
    /**
     * @type {(...dom: Dom | Dom[]) => Dom}
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
     * @type {(num: number) => Dom}
     */
    remove = num => {
        this._node.removeChild(this.children(num));
        return this;
    }
    /**
     * @type {(count: number) => Dom[]}
     * @deprecated This method is not supported starting with dynamic 1.2.0.
     */
    copy = count => {
        const tempbox = [];
        for (let i = 0; i < count; i++) tempbox.push($(this._node.cloneNode(true)));
        return tempbox;
    }
    /**
     * @type {(...dom?: Dom | Dom[]) => Dom}
     */
    reset = (...dom) => {
        this._node.innerHTML = "";
        this.add(...dom);
        return this;
    }
    /**
     * @type {(additional: object?) => Dom}
     */
    set = additional => {
        if (additional) for (const [key, value] of Object.entries(additional)) (key == "html" || key == "innerHTML") ? this._node.innerHTML = value : (key == "text" || key == "innerText") ? this._node.innerText = value : (key.indexOf("on") != -1) ? this._node[key] = value : this._node.setAttribute(key, value);
        return this;
    };
    /**
     * @type {(node: string | HTMLElement, additional: Object?) => Dom}
     */
    constructor(node, additional) {
        this._node = (typeof node === "string") ? document.createElement(node) : node;
        this.set(additional);
    }
}
const Fragment = class {
    #view;
    #fragment;
    #action;
    /**
     * @type {(action: Function) => Fragment}
     */
    registAction = action => {
        this.#action = action;
        return this;
    }
    /**
     * @type {() => Fragment}
     */
    launch = () => {
        snipe(`fragment[rid=${this.#view}]`).reset(this.#fragment)
        if (this.#action != null) this.#action();
        return this;
    }
    /**
     * @type {(view: String, ...fragment: Dom) => Fragment}
     */
    constructor(view, ...fragment) {
        this.#view = view;
        this.#fragment = fragment;
    }
}
/**
 * @type {(node: string | HTMLElement, additional?: Object) => Dom}
 */
const $ = (node, additional) => new Dom(node, additional);
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
const scan = selector => (typeof selector == "string") ? (selector[0] == "!") ? document.querySelectorAll(selector.split("!")[1]) : document.querySelector(selector) : selector;
/**
 * @type {{
* (selector: `!${string}`) => Dom[]
* (selector: string) => Dom
* (selector: HTMLElement) => Dom
* }}
*/
const snipe = selector => {
   const temp = ((typeof selector == "string") && (selector[0] == "!")) ? [] : $(scan(selector));
   if (typeof temp == "object") for (let i = 0; i < scan(selector).length; i++) temp.push($(scan(selector)[i]));
   return temp;
}
/**
 * @type {(jhpath: string) => void}
 * @throws {SecurityError}
 * @deprecated This function is not supported starting with dynamic 1.2.0. Use Fragment.launch() instead.
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

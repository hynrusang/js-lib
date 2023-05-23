/*
이 소스코드는 js로 html을 빠르고 간편하게 만들기 위해 작성되었습니다.
절대로 무단으로 가져가지 마시기 바랍니다.
작성자: 환류상
 */
const Dom = class {
    #node;
    /**
     * @type {() => HTMLElement}
     */
    get node() {
        return this.#node;
    }
    /**
     * @type {(num: number) => HTMLElement}
     */
    children = num => this.#node.children[num] ? new Dom(this.#node.children[num]) : null;
    /**
     * @type {(...dom: Dom | Dom[]) => Dom}
     */
    add = (...dom) => {
        for (let pdom of dom) {
            if (Array.isArray(pdom)) {
                for (let cdom of pdom) this.#node.appendChild(cdom.node);
            } else this.#node.appendChild(pdom.node);
        }
        return this;
    }
    /**
     * @type {(num: number) => Dom}
     */
    remove = num => {
        this.#node.removeChild(this.children(num));
        return this;
    }
    /**
     * @type {(...dom?: Dom | Dom[]) => Dom}
     */
    reset = (...dom) => {
        this.#node.innerHTML = "";
        this.add(...dom);
        return this;
    }
    /**
     * @type {(additional: Object) => Dom}
     */
    set = additional => {
        if (typeof additional === 'object') {
            for (const [key, value] of Object.entries(additional)) {
                if (["innerHTML", "html"].includes(key)) this.#node.innerHTML = value
                else if (["innerText", "text"].includes(key)) this.#node.innerText = value
                else if (key.indexOf("on") != -1) this.#node[key] = value
                else this.#node.setAttribute(key, value);
            }
        } else throw new Error('Additional parameter must be an {key: value} object');
        return this;
    };
    /**
     * @type {(node: string | HTMLElement, additional: Object?) => Dom}
     */
    constructor(node, additional) {
        this.#node = (typeof node === "string") ? document.createElement(node) : node;
        if (typeof additional !== 'undefined') this.set(additional);
    }
}
const Fragment = class {
    #view;
    #fragment;
    #action;
    #swipAnimation;
    #animationExcuteTime;
    /**
     * @type {() => Function}
     */
    get action() {
        return this.#action;
    }
    /*
     * @type {() => HTMLElement}
     */
    get view() {
        return this.#view;
    }
    /*
     * @type {() => Dom[]}
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * @type {(action: Function) => Fragment}
     */
    registAction = action => {
        this.#action = action;
        return this;
    }
    /**
     * @type {(animation: FragAnimation, second: Number) => Fragment}
     */
    registAnimation = (animation, second) => {
        this.#swipAnimation = animation;
        this.#animationExcuteTime = second;
        return this;
    }
    /**
     * @type {() => Fragment}
     */
    launch = () => {
        if (this.#swipAnimation != null) this.#swipAnimation(this, this.#animationExcuteTime);
        else {
            this.#view.reset(this.#fragment)
            if (typeof this.#action == "function") this.#action();
        }
        return this;
    }
    /**
     * @type {(view: String, ...fragment: Dom) => Fragment}
     */
    constructor(view, ...fragment) {
        this.#view = snipe(`fragment[rid=${view}]`);
        this.#fragment = fragment;
    }
}
/**
 * @description this class is used as an indirect reference in the first parameter of Fragment's registerAnimation method.
 */
const FragAnimation = class {
    static card = async (_fragment, _second) => {
        if (_fragment.view.node.innerHTML != "") {
            _fragment.view.node.animate([{transform: 'rotateY(0deg)', opacity: '1'}, {transform: 'rotateY(180deg)', opacity: '0'}], {duration: _second * 500,})
            await new Promise(code => setTimeout(code, _second * 450));
            _fragment.view.reset(_fragment.fragment);
            _fragment.view.node.animate([{transform: 'rotateY(180deg)', opacity: '0'}, {transform: 'rotateY(360deg)', opacity: '1'}], {duration: _second * 500,})
        } else _fragment.view.reset(_fragment.fragment);
        if (typeof _fragment.action == "function") _fragment.action();
    }
    static fade = async (_fragment, _second) => {
        if (_fragment.view.node.innerHTML != "") {
            _fragment.view.node.animate([{opacity: '1'}, {opacity: '0'}], {duration: _second * 500,})
            await new Promise(code => setTimeout(code, _second * 400));
            _fragment.view.reset(_fragment.fragment);
            _fragment.view.node.animate([{opacity: '0'}, {opacity: '1'}], {duration: _second * 500,})
        } else _fragment.view.reset(_fragment.fragment);
        if (typeof _fragment.action == "function") _fragment.action();
    }
    static swip = async (_fragment, _second) => {
        if (_fragment.view.node.innerHTML != "") {
            _fragment.view.node.animate([{marginLeft: '0%'}, {marginLeft: '100%'}], {duration: _second * 450,})
            await new Promise(code => setTimeout(code, _second * 400));
            _fragment.view.reset(_fragment.fragment);
            _fragment.view.node.animate([{marginLeft: '-200%'}, {marginLeft: '0%'}], {duration: _second * 550,})
        } else _fragment.view.reset(_fragment.fragment);
        if (typeof _fragment.action == "function") _fragment.action();
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

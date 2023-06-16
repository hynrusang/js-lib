/*
html 내에서 html binding과 같은 유용한 기능을 보다 쉽게 사용할 수 있게 해줍니다.
작성자: 환류상
 */
const Binder = class {
    static #bindlist = {};
    static #synclist = {};
    static #innerSync = (obj, expression) => {
        const subStrings = obj.attributes.exp.value.split("->")[0].split(" ").filter(value => value != "");
        let returnString = expression;
        for (let match of returnString.match(/\{(.+?)\}/g)) {
            let replaced = match;
            for (let subString of subStrings) replaced = replaced.replaceAll(subString, `__#${subString}__`);
            returnString = returnString.replace(match, `${replaced}`);
        }
        for (let subString of subStrings) {
            const parsing = ["INPUT", "TEXTAREA"].includes(this.#bindlist[subString].nodeName) ? this.#bindlist[subString].value : this.#bindlist[subString].innerText;
            if (parsing.indexOf("$") != -1) returnString = returnString.replaceAll(`__#${subString}__`, Math[parsing.split("$")[1]]);
            else if (isNaN(parsing) || parsing == "" || /^0[0-9]/g.test(parsing.trim().replace("-", "").replace("+", ""))) returnString = returnString.replaceAll(`__#${subString}__`, `"${parsing.replace(/"/g, '\\"').replaceAll("{", "").replaceAll("}", "").replaceAll("<->", "↔").replaceAll("->", "→").replaceAll("<-", "←")}"`)
            else returnString = returnString.replaceAll(`__#${subString}__`, parsing);
        }
        returnString = returnString.replaceAll(/\{([^{}]+)\}/g, (match, group) => {
            const result = eval(group);
            return result;
        });
        if (["INPUT", "TEXTAREA"].includes(obj.nodeName)) obj.value = returnString.split("->")[1];
        else obj.innerText = returnString.split("->")[1];
    }
    static _set = () => {
        this.#synclist = {};
        for (let element of document.querySelectorAll("[var]")) {
            const varValues = element.attributes.var.value.split("=");
            this.#bindlist[varValues[0]] = element;
            if (varValues[1] && varValues[1] != "") {
                if (["INPUT", "TEXTAREA"].includes(element.nodeName)) element.value = varValues[1];
                else obj.innerText = varValues[1];
            }
            element.addEventListener('input', () => this.sync(element));
        }
        for (let element of document.querySelectorAll("[exp]")) {
            for (let name of element.attributes.exp.value.split("->")[0].split(" ").filter(value => value != "")) {
                this.#synclist[name] ? this.#synclist[name].push(element) : this.#synclist[name] = [element];
                this.#innerSync(element, element.attributes.exp.value)
            }
        }
    }
    static sync = obj => {
        const varValue = obj.attributes.var.value.split("=")[0];
        if (typeof this.#synclist[varValue] == "object") for (let element of this.#synclist[varValue]) this.#innerSync(element, element.attributes.exp.value);
    }
    static find = id => this.#bindlist[id];
}
document.body.addEventListener('DOMNodeInserted', e => {
    if (e.target instanceof HTMLElement) Binder._set();
});
Binder._set();

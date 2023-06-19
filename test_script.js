Binder.define("test", "32to");

let element = document.createElement("p");
element.setAttribute("exp", "test->test data: {test}");
document.body.appendChild(element);

element = document.createElement("input");
element.setAttribute("var", "a=32");
document.body.appendChild(element);

element = document.createElement("p");
element.setAttribute("exp", "a->the value is {a}");
document.body.appendChild(element);
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

// test

const test = {
    p: new Pointer(3, Number),
    l: new LiveData(7, Number, function () {
        console.log(test);
        for (let data of Object.values(test)) console.log(data.value);
    })
}
test.l.value = 5;
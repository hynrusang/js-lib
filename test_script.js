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

const test =  new LiveData(7, Number).registObserver(function () {
    console.log(this.value);
});
const test2 = new LiveData(7, {
    type: Number,
    observer: function () {
        console.log(`this is renew by livedata 1.2.0: value: ${this.value}`)
    }
})
test.value = 5;
test2.value = 8;
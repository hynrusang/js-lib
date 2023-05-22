const makeTestDom = (value, text) => $("fieldset").add(
    $("legend", {text: `${text} fragment`, style: "color: red;" }),
    $("input", {
        type: "button", value: value, style: "height: 200px; width: 200px; margin-left: calc(50% - 100px); font-size: 150px;", onclick: () => {
            alert(`you clicked ${value}!`);
        }
    })
)
const state = new LiveData("first").registObserver(function () {
    console.log(`${this.value} Fragment is stating now...`);
    scan("nav").innerHTML = `Current-Fragment://${this.value}`
});

const fragmentBox = [new Fragment("fragmentView", makeTestDom("A", "first")).registAnimation(FragAnimation.card, 1).registAction(function () {
    state.value = "first";
}).launch(),
new Fragment("fragmentView", makeTestDom("B", "second")).registAnimation(FragAnimation.fade, 1).registAction(function () {
    state.value = "second";
}),
new Fragment("fragmentView", makeTestDom("C", "third")).registAnimation(FragAnimation.swip, 1).registAction(function () {
    state.value = "third";
}),
new Fragment("fragmentView", makeTestDom("D", "fourth")).registAction(function () {
    state.value = "fourth";
})];

scan("!footer input").forEach((element, index) => {
    element.onclick = () => {
        scan(".activate").classList.remove("activate");
        element.classList.add("activate");
        fragmentBox[index].launch();
    }
});

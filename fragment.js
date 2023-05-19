const makeTestDom = (alphabet, fragmentIdentity) => $("fieldset").add(
    $("legend", {text: `${fragmentIdentity} fragment`, style: "color: red;"}),
    $("input", {type: "button", value: alphabet, style: "height: 200px; width: 200px; margin-left: calc(50% - 100px); font-size: 150px;", onclick: () => {
        alert(`you clicked ${alphabet}!`);
    }})
)

const state = new LiveData("first").setObserver(function () {
    console.log(`${this.get()} Fragment is stating now...`);
    scan("nav").innerHTML = `Current-Fragment://${this.value}`
});

const fragmentBox = [new Fragment("fragmentView", makeTestDom("A", "first")).registAnimation(FragAnimation.card, 1).registAction(() => {
    state.value = "first";
}).launch(),
new Fragment("fragmentView", makeTestDom("B", "second")).registAnimation(FragAnimation.fade, 1).registAction(() => {
    state.value = "second";
}),
new Fragment("fragmentView", makeTestDom("C", "third")).registAnimation(FragAnimation.swip, 1).registAction(() => {
    state.value = "third";
}),
new Fragment("fragmentView", makeTestDom("D", "fourth")).registAction(() => {
    state.value = "fourth";
})];

scan("!footer input").forEach((element, index) => {
    element.onclick = () => {
        scan(".activate").classList.remove("activate");
        element.classList.add("activate");
        fragmentBox[index].launch();
    }
});
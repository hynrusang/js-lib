const mainFrame = new Scene("fragmentView", {
    index: new Fragment(
        $("h1", { text: "js-lib 실험실입니다." }),
        $("p", { })
    ).launch()
})
const currentFragment = new LiveData("firstFragment", String).registObserver(function () {
    scan(".activate").classList.remove("activate")
    scan(`[target=${this.value}]`).classList.add("activate")
    fragmentList[this.value].launch();
})
const fragmentList = {
    firstFragment: new Fragment("fragmentView", 
        $("h1", {text: "여기는 dynamic.js의 기능을 설명하는 곳입니다."}),
        $("p", {text: "dynamic.js의 주요 기능"})
    ).registAnimation(FragAnimation.card, 0.8).launch(),
    secondFragment: new Fragment("fragmentView", 
        $("h1", {text: "여기는 livedata.js의 기능을 설명하는 곳입니다."})
    ).registAnimation(FragAnimation.fade, 0.8)
}
scan("!footer input").forEach(obj => {
    obj.onclick = e => {
        currentFragment.value = e.target.attributes.target.value;
    }
})
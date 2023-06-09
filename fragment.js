﻿const currentFragment = new LiveData("dynamic", {
    type: String, 
    observer: function () {
        scan(".activate").classList.remove("activate")
        scan(`[target=${this.value}]`).classList.add("activate")
        fragmentList[this.value].launch();
    }
});
const fragmentList = {
    dynamic: new Fragment("fragmentView", 
        $("h1", {text: "여기는 dynamic.js의 기능을 보여주는 곳입니다."}),
        $("p", {html: "js로 html 요소를 동적으로 더 쉽게 다룰 수 있게 해 줍니다.<br>(dynamic.js의 주요 기능은 다음과 같습니다.)"}),
        $("ul").add(
            $("li", {text: "동적인 요소 생성 / 수정"}),
            $("p", {html: "$ 함수는 손쉽게 HTMLElement 요소를 만들어서, 간단한 수정, 삭제, 이벤트 핸들러 등의 기능과 함께 캡슐화 한 객체를 만들어 주는 함수입니다.<br>\
            scan 함수는 기존의 캡슐화 되지 않은 HTMLElement를 찾아서 반환해줍니다. 요청에 따라 document.querySelector, document.querySelectorAll을 능동적으로 반환합니다.<br>\
            snipe 함수는 scan 함수처럼, 기존의 HTMLElement를 찾고, $ 함수처럼 다양한 수정, 삭제, 이벤트 핸들러 등의 기능과 함께 캡슐화 한 객체를 반환합니다."}),
            $("li", {text: "fragment 커스텀 태그를 이용한 페이지 모듈화"}),
            $("p", {html: "Fragment는 여타 다른 프레임워크랑 비슷하게 일부 HTML 요소들을 모듈화 하여 관리할 수 있게 해주는 클래스입니다.<br>\
            그에 그치지 않고 FragAnimation 같은 추가적인 static 클래스와 함께 Fragment간 전환에 애니메이션 등을 추가로 넣을 수 있습니다."})
        ),
        $("p", {text: "dynamic.js를 이용하여 구현한 부분은 다음과 같습니다."}),
        $("input", {type: "button", value: "구현부 가시화", style: "width: 120px; height: 40px; margin-left: 15px;", onclick: () => scan("fragment").animate([{}, {backgroundColor: "rgba(0,0,0,0.3)"}, {}], {duration: 1200}) })
    ).registAnimation(FragAnimation.card, 0.6).launch(),

    livedata: new Fragment("fragmentView", 
        $("h1", {text: "여기는 livedata.js의 기능을 보여주는 곳입니다."}),
        $("p", {html: "js에서 값의 변화를 관측하는 LiveData를 비롯한 여러 기능들을 사용할 수 있게 해줍니다.<br>(livedata.js의 주요 기능은 다음과 같습니다.)"}),
        $("ul").add(
            $("li", {text: "값의 변화를 관측하는 LiveData"}),
            $("p", {html: "LiveData는 kotlin에 있는 LiveData처럼 값의 변화를 추적해서, observer를 실행시켜주는 클래스입니다.<br>\
            LiveData에는 또한 예상치 못한 작동을 방지하기 위해, Number, String, Array, Object 등의 타입만 값으로 설정하게 제한할 수도 있으며,<br>\
            함수를 이용한 방식이 아닌, setter랑 getter를 이용한 방식으로 손쉽게 LiveData를 사용할 수 있게 해줍니다."}),
            $("li", {text: "여러 LiveData들을 묶어서 관리하는 LiveDataManager"}),
            $("p", {html: "js에서는 여러 LiveData들을 하나의 LiveDataManager 객체로 손 쉽게 관리가 가능합니다.<br>\
            또한 각 LiveData의 접근성도 별도로 설정함으로서 보안도 강화시킬 수 있습니다.<br>\
            각 LiveData들의 값을 설정 및 가져오려면 기존의 LiveData의 value와 비슷하게 value 함수들을 이용하여 접근할 수 있습니다."}),
        ),
        $("p", {text: "livedata.js를 이용하여 구현한 부분은 다음과 같습니다."}),
        $("input", {type: "button", value: "구현부 가시화", style: "width: 120px; height: 40px; margin-left: 15px;", onclick: () => {
            scan("!footer input").forEach(obj => obj.animate([{}, {backgroundColor: "rgba(0,0,0,0.3)"}, {}], {duration: 1200}))
        }})
    ).registAnimation(FragAnimation.fade, 0.6),

    tagx: new Fragment("fragmentView",
        $("h1", {text: "여기는 tagx.js의 기능을 보여주는 곳입니다."}),
        $("p", {html: "html 내에서 html binding과 같은 유용한 기능을 보다 쉽게 사용할 수 있게 해줍니다.<br>(tagx.js의 주요 기능은 다음과 같습니다.)"}),
        $("ul").add(
            $("li", {text: "각 요소들간의 var, exp attribute를 통한 값 바인딩"}),
            $("p", {html: "var attribute를 이용하여 binding에 사용할 변수를 지정하고,<br>\
            exp attribute를 이용하여 binding에 사용할 변수들을 가지고 값들을 동적으로 다룰 수 있습니다.<br>\
            아래는 이 bind를 이용하여 요소들 간의 값들을 설정한 예시입니다."})
        ),
        $("p", {text: "tagx.js를 이용하여 구현한 부분은 다음과 같습니다."}),
        $("input", {type: "button", value: "구현부 가시화", style: "width: 120px; height: 40px; margin-left: 15px;", onclick: () => {
            scan("fieldset").animate([{}, {backgroundColor: "rgba(0,0,0,0.3)"}, {}], {duration: 1200})
        }}),
        $("fieldset").add(
            $("legend", {exp: "a->{a}"}),
            $("input", {type: "text", style: "width: 100%; height: 200px;", var: "a=binding example"}),
            $("input", {type: "text", style: "width: 50%; height: 40px; text-align: center;", var: "b=6"}),
            $("input", {type: "text", style: "width: 50%; height: 40px; text-align: center;", var: "c=11"}),
            $("p", {exp: "a b c->{a}: {b} + {c} = {b + c} (각 값들은 숫자가 아닌 문자열도 지원합니다.)"}),
            $("input", {type: "button", value: "binding된 요소 초기화", style: "width: 300px; height: 40px; margin-left: 15px; margin-bottom: 10px;", onclick: e => {
                Binder.update("a", "binding example");
                Binder.update("b", 6);
                Binder.update("c", 11);
            }}),
            $("br"),
            $("input", {type: "button", value: "binding된 요소들 console에 출력하기", style: "width: 300px; height: 40px; margin-left: 15px;", onclick: e => {
                console.clear();
                for (let i = 0; i < 3; i++) console.log(scan("!fieldset input")[i]);
                console.log(scan("fieldset p"));
            }})
        ),
    ).registAnimation(FragAnimation.swip, 0.6),

    advanced: new Fragment("fragmentView",
        $("h1", {text: "여기는 advanced.js의 기능을 보여주는 곳입니다."})
    )
}
scan("!footer input").forEach(obj => {
    const targetValue = obj.attributes.target.value;
    obj.value = targetValue;
    obj.style.backgroundImage = `url(resource/${targetValue}.png)`;
    obj.onclick = e => currentFragment.value = e.target.value;
})

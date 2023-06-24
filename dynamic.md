# ![JavaScript icon](https://github.com/hynrusang/js-lib/blob/main/resource/logo.png) Dynamic Fragment Animation (DFA)
- [이전으로](https://github.com/hynrusang/js-lib/tree/main)
- [소스코드](https://github.com/hynrusang/js-lib/blob/main/1.2.0/dynamic.js)
---
- **이 문서는 developer 버전인 1.2.0을 다룹니다.**  
- **현재 prerelease 버전은 1.2.0입니다.**
- **현재 release 버전은 1.1.0입니다.**
## 정보
- js로 **html** 요소를 동적으로 더 쉽게 다룰 수 있게 해 줍니다.   
- (사용방법은 아래의 요소 탭을 참고하세요.)

## 요소
<img src="https://github.com/hynrusang/js-lib/blob/main/resource/scene_dom.png">  
  
### 1. **@1.0.0** Dom: Class  
> **Dom**은 동적으로 **html 요소**를 **생성**하는 클래스입니다.  
> Dom 클래스 안에는, 다음과 같은 요소들이 있습니다.  
> 1. constructor(node: **String | HTMLElement**, additional: **Object**)  
> **Dom**의 생성자입니다.
> - **node**는 **this.#node: HTMLElement의 tagName**입니다.
> - **additional**은 **this.#node: HTMLElement에 설정할 추가적인 속성**입니다.
> ---
> 2. **@1.1.0** getter node
> - **this.#node: HTMLElement**를 반환합니다.
> ---
> 3. **@1.0.0** set(additional: **Object**)  
> - **additional**이 **object**인지 먼저 확인합니다.
> - **additional**에 전달된 **{key: value}** 를 **this.#node: HTMLElement**에 **설정**합니다.
> - **this: Dom**을 반환합니다.
> ---
> 4. **@1.0.0** remove(num: **Number**)
> - **this.#node**의 **num**번째 **children node**를 제거합니다.
> - **this: Dom**을 반환합니다.
> ---
> 5. **@1.0.0** children(num: **Number**)
> - **this.#node.children[num]: HTMLElement by Dom**을 반환합니다.
> ---
> 6. **@1.0.0** add(...dom: **Dom || Dom[]**)
> - **dom**들의 **node**를 **this.#node: HTMLElement**에 **appendChild**합니다.
> - **this: Dom**을 반환합니다.
> ---
> 7. **@1.0.0** reset(...dom: **Dom || Dom[]**)
> - **this: Dom**의 **innerHTML**을 **\"\"** 로 설정합니다.
> - **[add method](https://github.com/hynrusang/js-lib/blob/main/dynamic.md#1-6-100-adddom-dom--dom)** 를 호출합니다.
> - **this: Dom**을 반환합니다.
---
#### 1-1. constructor(node: **String | HTMLElement**, additional: **Object**)
> 우선 Dom 클래스를 이용해 동적으로 html 요소를 생성하는 방법은 다음과 같습니다.  
> **(여기서는 간단하게 h1 요소를 만듭니다.)**
```js
new Dom("h1")
```
> 만약, 이 h1요소의 **innerHTML**에 "<span>hello, world!</span>"라는 요소를 쓰고 싶다면 다음과 같이 하면 됩니다.
```js
new Dom("h1", {html: "<span>hello, world!</span>"})
```
> **innerText**의 경우도 마찬가지입니다.
```js
new Dom("h1", {text: "hello, world!"})
```
> 추가로 이 요소의 **color style**도 변경하고 싶다면 다음과 같이 하면 됩니다.
```js
new Dom("h1", {text: "hello, world!", style: "color: red"})
```
> 추가로 이 요소에 이벤트를 넣고 싶다면, 다음과 같이 하면 됩니다.
```js
new Dom("h1", {text: "hello, world!", style: "color: red", onclick: e => {
    alert(e.target.innerText)
}})
```
> 그 외에 id나 class같은 attribute 등도 마찬가지로 하면 됩니다.  
> **(기본적으론 js 구문이기 때문에, attribute value에 각종 expression등도 넣을 수 있습니다.)**
```js
new Dom("h1", {id: "test", dataIsNull: (data != null) ? "not null" : "null", text: "hello, world!", style: "color: red", onclick: e => {
    alert(e.target.innerText)
}})
```
> 또한, 하나의 **Dom** 요소 안에 **또 다른 Dom** 요소를 넣고싶다면, 다음과 같이 할 수 있습니다.
```js
new Dom("fieldset").add(
    new Dom("legend", {text: "this is legend"}),
    new Dom("input", {type: "button", value: "click here", onclick: () => {
        alert("clicked");
    }})
)
```
> 만약, 일일이 **Dom** 객체를 만드는데 **new**라는 키워드를 쓰기 싫으시다면, 다음과 같은 방법도 있습니다.  
> ([4](https://github.com/hynrusang/js-lib/blob/main/dynamic.md#4-100-node-additional--dom)번 문단에 있는 **$ function**를 이용한 방법입니다.)  
> 최종적으로 추천드리는 형태입니다.  
```js
$("fieldset").add(
    $("legend", {text: "this is legend"}),
    $("input", {type: "button", value: "click here", onclick: () => {
        alert("clicked");
    }})
)
```
---
#### 1-2. **@1.1.0** getter node  
1. **this.#node: HTMLElement**를 반환합니다.
  
예시:
```js
const dom = new Dom("div");
dom.node; // <div></div>;
dom.node = document.createElement("h1"); // it's not working.
dom.node; // <div></div>
```
---
#### 1-3. **@1.0.0** set(additional: **Object**)
1. **additional**이 **object**인지 먼저 확인합니다.
- **additional**이 **object**가 아닌 경우, **TypeError**를 **throw**합니다.
- **additional**이 **object**인 경우, 다음 절차로 넘어갑니다.
2. **additional**에 전달된 **{key: value}** 을 **this.#node: HTMLElement**에 **설정**합니다.
- **key**가 **innerHTML || html**인 경우, **this.#node: HTMLElement**의 **innerHTML**을 **value**로 설정합니다.
- **key**가 **innerText || text**인 경우, **this.#node: HTMLElement**의 **innerText**을 **value**로 설정합니다.
- **key**가 **on**으로 시작하거나 **async**인 경우, **this.#node: HTMLElement**의 **key**를 **value**로 설정합니다.
- **그 외의 경우**, **this.#node**의 **key attribute**를 **value**로 설정합니다.
3. **this: Dom**을 반환합니다.
  
예시:
```js
let color = "green";
const dom = new Dom("span").set({text: "hello!", style: `color: ${color}`});

// dom.node
<span style="color: green">hello!</span>
```
---
#### 1-4. **@1.0.0** remove(num: **Number**)
1. **this.#node**의 **num**번째 **children node**를 제거합니다.
2. **this: Dom**을 반환합니다.
  
예시:
```js
const dom = new Dom("fieldset").add(
    new Dom("legend", {text: "this is legend"}),
    new Dom("input", {type: "button", value: "click here", onclick: () => {
        alert("clicked");
    }})
).remove(1)

// dom.node
<fieldset>
  <legend>this is legend</legend>
</fieldset>
```
---
#### 1-5. **@1.0.0** children(num: **Number**)
1. **this.#node.children[num]: HTMLElement by Dom**을 반환합니다.
- 만약 **this.#node.children[num]: HTMLElement**가 존재한다면, 해당 **child**를 **Dom** 객체로 감싸서 반환합니다.
- 만약 **this.#node.children[num]: HTMLElement**가 존재하지 않다면, **null**을 반환합니다.
  
예시:
```js
const dom = new Dom("fieldset").add(
    new Dom("legend", {text: "this is legend"}),
    new Dom("input", {type: "button", value: "click here", onclick: () => {
        alert("clicked");
    }})
).children(1)

// console
Dom {node: input, children: ƒ, add: ƒ, remove: ƒ, copy: ƒ, …}
```
---
#### 1-6. **@1.0.0** add(...dom: **Dom || Dom[]**)
1. **dom**들의 **node**를 **this.#node: HTMLElement**에 **appendChild**합니다.
- dom이 **Dom[]** 인 경우, **[for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)** 루프를 통해 각각의 **Dom** 요소들의 **node**를 **this.#node: HTMLElement**에 **appendChild**합니다.
- dom이 **Dom**인 경우, **dom.node**를 **this.#node: HTMLElement**에 **appendChild**합니다.
2. **this: Dom**을 반환합니다.
  
예시:
```js
const dom = new Dom("form", {onsubmit: e => {
    e.preventDefault();
    console.log(e.target);
}}).add(
    new Dom("fieldset").add(
        new Dom("legend", {text: "this is legend"}),
        new Dom("input", {type: "submit", value: "submit"})
    )
)

// dom.node
<form>
    <fieldset>
        <legend>this is legend</legend>
        <input type="submit" value="submit">
    </fieldset>
</form>
```
---
#### 1-7. **@1.0.0** reset(...dom: **Dom || Dom[]**) 
1. **this: Dom**의 **innerHTML**을 **\"\"** 로 설정합니다.
2. **[add method](https://github.com/hynrusang/js-lib/blob/main/dynamic.md#1-6-100-adddom-dom--dom)** 를 호출합니다.
3. **this: Dom**을 반환합니다.
  
예시:
```js
const dom = new Dom("form", {onsubmit: e => {
    e.preventDefault();
    console.log(e.target);
}}).add(
    new Dom("fieldset").add(
        new Dom("legend", {text: "this is legend"}),
        new Dom("input", {type: "submit", value: "submit"})
    )
)
dom.reset(
    new Dom("input", {type: "text", placeholder: "was replaced"}),
    new Dom("input", {type: "submit", value: "submit"})
)

// dom.node
<form>
    <input type="text" placeholder="was replaced">
    <input type="submit" value="submit">
</form>
```
---
<img src="https://github.com/hynrusang/js-lib/blob/main/resource/scene_fragment.png">  
  
### 2. **@1.1.0** Fragment: class
> **Fragment**는 **\<fragment\>\</fragment\> 태그**와 별도의 **Dom 요소**들로 정의된 **fragment**를 관리하는 클래스입니다.  
> **html 내의 별도의 \<fragment\> 태그랑 같이 사용해야 합니다.**  
> Fragment 클래스 안에는, 다음과 같은 요소들이 있습니다.  
> 1. constructor(view: **String**, ...fragment: **Dom || Dom[]**)  
> Fragment의 생성자입니다.
> - **view**는 **Fragment 전환을 구현할 \<fragment\> 태그의 rid 속성값**입니다.
> - **fragment**는 **하나의 Fragment를 구성할 Dom 인스턴스들**입니다.
> ---
> 2. **@1.1.0** launch()
> - **[this.#swipAnimation](https://github.com/hynrusang/js-lib/blob/main/dynamic.md#2-4-120-registanimationanimation-fraganimation-second-number)** 이 **null**이 아닌 경우, **this.#swipAnimation**을 **this.#animationExcuteTime**초만큼 실행합니다.
> - **[this.#action](https://github.com/hynrusang/js-lib/blob/main/dynamic.md#2-3-110-registactionaction-function)** 이 **Function**인 경우, **this.#action**을 실행합니다.
> - **rid** 속성값이 **this.#view**인 **\<fragment\>** 의 **children**을 **this.#fragment**들로 전환합니다.
> - **this: Fragment**을 반환합니다.
> ---
> 3. **@1.1.0** registAction(action: **Function**)
> - **action: Function**을 **this.#action**에 설정합니다.
> - **this: Fragment**을 반환합니다.
> ---
> 4. **@1.2.0** registAnimation(animation: **FragAnimation**, second: **Number**)
> - **animation: FragAnimation**과 **second: Number**를 각각 **this.#swipAnimation**과 **this.#animationExcuteTime**에 설정합니다.
> - **this: Fragment**을 반환합니다.
---
#### 2-1. constructor(view, ...fragment)
> 우선 Fragment 클래스를 이용해 동적으로 요소 swiping을 하는 예제는 다음과 같습니다.  
> (다소 복잡한 Dom 구문이 포함되어 있습니다. [1번](https://github.com/hynrusang/js-lib/blob/main/dynamic.md#1-100-dom-class  ) 문단을 참고해주세요.)  
```js
/* index.html */
<fragment rid="fragmentView"></fragment>

/* fragment.js */
const mainFragment = new Fragment("fragmentView", 
    $("fieldset").add(
        $("legend", {text: "first fragment", style: "color: red;"}),
        $("input", {type: "button", value: "go to second fragment", onclick: () => {
            secondFragment.launch();
        }})
    )
).launch();
// Fragment.launch()를 하게 되면, 해당 프레그먼트가 선택된 상태로 만들어 집니다.

const secondFragment = new Fragment("fragmentView", 
    $("h1", {text: "rest floor", style: "color: green"}),
    $("p", {text: "just test case..."}),
    $("input", {type: "button", value: "go to first fragment", onclick: () => {
        mainFragment.launch();
    }})
)
```
---
#### 2-2. **@1.1.0** launch()
1. **[this.#swipAnimation](https://github.com/hynrusang/js-lib/blob/main/dynamic.md#2-4-120-registanimationanimation-fraganimation-second-number)** 이 **null**이 아닌 경우, **this.#swipAnimation**을 **this.#animationExcuteTime**초만큼 실행합니다.
2. **[this.#action](https://github.com/hynrusang/js-lib/blob/main/dynamic.md#2-3-110-registactionaction-function)** 이 **Function**인 경우, **this.#action**을 실행합니다.
3. **rid** 속성값이 **this.#view**인 **\<fragment\>** 의 **children**을 **this.#fragment**들로 전환합니다.
4. **this: Fragment**을 반환합니다.
  
예시:  
```js
// index.html
<fragment rid="target"></fragment>

// fragment.js
const mainFragment = new Fragment("target", 
    $("h1", {text: "hello, world", style: "color: red"})
)
const secondFragment = new Fragment("target", 
    $("h1", {text: "hi, world!", style: "color: blue"})
)
mainFragment.launch();
```
---
#### 2-3. **@1.1.0** registAction(action: **Function**)
1. **action: Function**을 **this.#action**에 설정합니다.
2. **this: Fragment**을 반환합니다.
  
예시: ([2-1](https://github.com/hynrusang/js-lib/blob/main/dynamic.md#2-1-constructorview-fragment)의 예시를 조금 수정합니다.)   
([livedata.js](https://github.com/hynrusang/js-lib/blob/main/livedata.md)를 추가로 이용합니다.)  
```js
/* index.html */
<fragment rid="fragmentView"></fragment>

/* fragment.js */
const state = new LiveData("first", String, function () {
    alert(`${this.value} Fragment is stating now...`);
});
const mainFragment = new Fragment("fragmentView", 
    $("fieldset").add(
        $("legend", {text: "first fragment", style: "color: red;"}),
        $("input", {type: "button", value: "go to second fragment", onclick: () => {
            secondFragment.launch();
        }})
    )
).registAction(() => {
    state.value = "first";
}).launch();
// Fragment.launch()를 하게 되면, 해당 프레그먼트가 선택된 상태로 만들어 집니다.

const secondFragment = new Fragment("fragmentView", 
    $("h1", {text: "rest floor", style: "color: green"}),
    $("p", {text: "just test case..."}),
    $("input", {type: "button", value: "go to first fragment", onclick: () => {
        mainFragment.launch();
    }})
).registAction(() => {
    state.value = "second";
})
```
---
#### 2-4. **@1.2.0** registAnimation(animation: **FragAnimation**, second: **Number**)
1. **animation: FragAnimation**과 **second: Number**를 각각 **this.#swipAnimation**과 **this.#animationExcuteTime**에 설정합니다.
2. **this: Fragment**을 반환합니다.
  
예시:  
```js
/* index.html */
<fragment rid="fragmentView"></fragment>

/* fragment.js */
const mainFragment = new Fragment("fragmentView", 
    $("fieldset").add(
        $("legend", {text: "first fragment", style: "color: red;"}),
        $("input", {type: "button", value: "go to second fragment", onclick: () => {
            secondFragment.launch();
        }})
    )
).registAnimation(FragAnimation.card, 1.5).launch();
const secondFragment = new Fragment("fragmentView", 
    $("fieldset").add(
        $("legend", {text: "second fragment", style: "color: red;"}),
        $("input", {type: "button", value: "go to frist fragment", onclick: () => {
            mainFragment.launch();
        }})
    )
).registAnimation(FragAnimation.swip, 1.5);
```
---
### 3. **@1.2.0** FragAnimation : static Class  
> **FragAnimation**은 **[Fragment.registerAnimation](https://github.com/hynrusang/js-lib/blob/main/dynamic.md#2-3-120-registanimationanimation-second)** 의 **first** 매개변수로 간접 참조되는 클래스입니다.  
> **FragAnimation** 클래스에는 다음과 같은 메서드들이 있습니다:  
> 1. **@1.2.0** card
> - **card animation**을 수행하는 메서드입니다.
> ---
> 2. **@1.2.0** fade  
> **fade animation**을 수행하는 메서드입니다.
> ---
> 3. **@1.2.0** swip  
> - **swip animation**을 수행하는 메서드입니다.
> ---
- 각각의 Animation들의 모습은 다음과 같습니다.  
---  
#### 3-1. **@1.2.0** card
```js
new Fragment("fragmentView", 
    $("fieldset").add(
        $("legend", {text: "first fragment", style: "color: red;"}),
        $("input", {type: "button", value: "go to second fragment"})
    )
).registAnimation(FragAnimation.card, 0.8).launch();
```
<img src="https://github.com/hynrusang/js-lib/blob/main/resource/cardAnimation.gif" style="width: 50%; height: auto;" align="center" />  
   
---
#### 3-2. **@1.2.0** fade
```js
new Fragment("fragmentView", 
    $("fieldset").add(
        $("legend", {text: "first fragment", style: "color: red;"}),
        $("input", {type: "button", value: "go to second fragment"})
    )
).registAnimation(FragAnimation.fade, 0.8).launch();
```
<img src="https://github.com/hynrusang/js-lib/blob/main/resource/fadeAnimation.gif" style="width: 50%; height: auto;" align="center" />  
   
---
#### 3-3. **@1.2.0** swip
```js
new Fragment("fragmentView",
    $("fieldset").add(
        $("legend", {text: "first fragment", style: "color: red;"}),
        $("input", {type: "button", value: "go to second fragment"})
    )
).registAnimation(FragAnimation.swip, 0.8).launch();
```  
<img src="https://github.com/hynrusang/js-lib/blob/main/resource/swipAnimation.gif" style="width: 50%; height: auto;" align="center" />  
  
---
### 4. **@1.0.0** $(node, additional) : Dom
> **$** 함수는 **Dom 객체**를 **생성** 또는 **타게팅**하여 반환하는 함수입니다.  
> $ 함수는 다음과 같은 **매개변수**를 받습니다.  
  
- **node**: **문자열** 또는 **HTMLElement**로, **Dom 객체**를 **생성** 또는 **타게팅**할 때 사용할 노드입니다.  
- **additional** (선택적): **추가적인 옵션**을 담은 객체로, **Dom 객체** 생성 시 사용됩니다.  
  
예시:  
```js
new Dom("fieldset").add(
    new Dom("legend", {text: "this is legend"}),
    new Dom("input", {type: "button", value: "click here", onclick: () => {
        alert("clicked");
    }})
)

// -> using $ function
$("fieldset").add(
    $("legend", {text: "this is legend"}),
    $("input", {type: "button", value: "click here", onclick: () => {
        alert("clicked");
    }})
)
```
---
### 5. **@1.0.0** scan(selector) : document.querySelector : document.querySelectorAll
> **scan** 함수는 **selector**를 기반으로 **HTMLElement**를 **검색**하는 함수입니다.  
> 또한, 이 함수가 반환하는 **HTMLElement**나 **NodeList**는  
> [advanced.js](https://github.com/hynrusang/js-lib/blob/main/advanced.md)의 **(HTMLElement || NodeList).prototype.indexOf** 와 연계될 수 있습니다.  
> scan 함수는 다음과 같은 **매개변수**를 받습니다.  
  
- **selector**: 검색할 요소의 **선택자**입니다.  
  
scan 함수는 다음과 같은 동작을 수행합니다:  
  
1. 만약 **selector**가 문자열인 경우:
  
- **selector**가 **! 문자**로 시작하는 경우,  
해당 **selector**를 사용하여 **document.querySelectorAll**을 호출하고,  
일치하는 **모든 요소의 NodeList**를 **반환**합니다.  
  
- **selector**가 **! 문자**로 시작하지 않는 경우,  
해당 **selector**를 사용하여 **document.querySelector**를 호출하고,  
일치하는 **첫 번째 요소**를 **반환**합니다
  
2. 만약 **selector**가 **문자열이 아닌 경우**, **selector 자체**를 반환합니다.  
  
예시:  
```js
scan("main");
scan("!article");
scan(scan("fragment"));

// return되는 객체
<main id="page-1"></main>
[<article id="section-1"</article>, <article id="section-2"</article>, <article id="section-3"</article>]
<fragment rid="mainFragment"></fragment>
```
---
### 6. **@1.0.0** snipe(selector) : Dom
> **snipe** 함수는 **selector**를 기반으로 **HTMLElement**를 **검색**하여 **Dom 객체**로 반환하는 함수입니다.  
> snipe 함수는 다음과 같은 **매개변수**를 받습니다.
  
- **selector**: 검색할 요소의 **선택자**입니다.  
  
snipe 함수는 다음과 같은 동작을 수행합니다:  
  
1. 만약 **selector**가 문자열인 경우:  
  
- **selector**가 **! 문자**로 시작하는 경우,  
해당 **selector**를 사용하여 **scan**을 호출하고,  
각 요소들을 **Dom 객체**로 **변환**하여, **Array\<Dom\>** 형식으로 반환합니다.  
    
- **selector**가 **! 문자**로 시작하지 않는 경우,  
해당 **selector**를 사용하여 **scan**을 호출하고,  
해당 요소를 **Dom 객체**로 **변환**하여, **Dom** 형식으로 반환합니다.  
  
2. 만약 **selector**가 **문자열이 아닌 경우**, **selector 자체**를 **Dom 객체**로 **변환**하여 반환합니다.  
  
예시:  
```js
snipe("body").add(
    $("h1", {text: "test string", style: "color: red"}),
    $("hr"),
    $("div").add(
        $("p", {text: "it is sub string.", style: "color: blue", onmouseover: e => {
            e.target.style.color = "red";
        }, onmouseout: e => {
            e.target.style.color = "blue";
        }})
    )
)
snipe(scan("div")).reset(
    $("div", {html: "child div 1"}),
    $("div", {html: "child div 2"}),
    $("div", {html: "child div 3"})
)
snipe("!div")[2].set({text: "replaced!!", onclick: () => {
    alert("hello, world.")
}})

// result
<body>
    ...
    <h1 style="color: red">test string</h1>
    <hr />
    <div>
        <p style="color: blue">it is sub string</p>
    </div>
</body>
<body>
    ...
    <h1 style="color: red">test string</h1>
    <hr />
    <div>
        <div>child div 1</div>
        <div>child div 2</div>
        <div>child div 3</div>
    </div>
</body>
<body>
    ...
    <h1 style="color: red">test string</h1>
    <hr />
    <div>
        <div>child div 1</div>
        <div>replaced!!</div>
        <div>child div 3</div>
    </div>
</body>
```
---
## 업데이트 내역
> 1.0.0  
> create class DomDefault;  
> create class DomExpert extends DomDefault;  
> 
> create $(node, additional): DomExpert;  
> create is(target, classname): boolean;  
> create wait(millisecond): Promise<void>;  
> create getIndex(parent, child): number;  
> create scan(selector): document.querySelector | document.querySelectorAll;  
> create snipe(selector): DomExpert | DomExpert[];  
> create loading(jhpath): void;  
---
> 1.1.0  
> combine class DomDefault, DomExpert to Dom;  
> create class Fragment;  
> create getter Dom.node;  
>   
> @deprecated loading;  
> @deprecated Dom.copy(count);  
> @deprecated Dom._node;  
> @transfer is(target, classname): boolean [advanced.js](https://github.com/hynrusang/js-lib/blob/main/advanced.md);  
> @transfer wait(millisecond): Promise<void> [advanced.js](https://github.com/hynrusang/js-lib/blob/main/advanced.md);  
> @transfer getIndex(parent, child): number [advanced.js](https://github.com/hynrusang/js-lib/blob/main/advanced.md);  
---
> 1.2.0  
> create static class FragAnimation;  
> create method Fragment.registAnimation(animation, millisecond): Fragment;  
> create getter Fragment.action;  
> create getter Fragment.view;  
> create getter Fragment.fragment;  
>  
> @update Dom._node to private;  
> @remove loading;  
> @remove Dom.copy(count): Dom[];  

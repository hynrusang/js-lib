# ![JavaScript icon](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/33px-Unofficial_JavaScript_logo_2.svg.png) Jh (Js + Html)
- [이전으로](https://github.com/hynrusang/program/js-lib/main/README.md)
- [소스코드](https://github.com/hynrusang/program/js-lib/main/1.1.0/jh.js)
---

## 정보
- 이건 동적으로 html 요소를 생성하거나, snipe 하거나, 별도의 Fragment(1.1.0 ~)를 생성 및 조작할 수 있게 해주는 js 파일 입니다.  
- (사용방법은 아래의 요소 탭을 참고하세요.)

## 요소
### 1. Dom: Class
> **Dom**은 동적으로 **html 요소**를 **생성**하는 클래스입니다.  
> Dom 클래스 안에는, 다음과 같은 요소들이 있습니다.  
> 1. constructor(node, additional) Dom 클래스의 생성자입니다.  
> **node**는 **문자열 또는 HTMLElement**입니다. **additional**은 **추가적인 옵션**을 담은 **객체 리터럴**입니다.  
> 2. children(num)  
> **num**에 해당하는 **자식 HTMLElement요소**를 반환합니다.  
> 3. add(...dom)  
> **dom**에 전달된 **Dom** 또는 **Dom 배열**을 해당 Dom의 **자식 요소**로 추가합니다.  
> 4. reset(...dom)  
> 해당 **Dom**의 자식 요소를 **모두 제거**하고 dom에 전달된 **Dom** 또는 **Dom 배열**을 추가합니다.  
> 5. **@deprecated** copy(count)  
> **count** 개수만큼 현재 **Dom**을 **복사**한 **Dom 배열**을 반환합니다. (jh 1.2.0부터 지원하지 않음)  
> 6. remove(num)  
> **num**에 해당하는 **자식 요소**를 **제거**합니다.   
> 7. set(additional)  
> **additional**에 전달된 **속성과 값**을 해당 **Dom**에 **설정**합니다.  
---
#### 1-1. constructor(node, additional)
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
> 또한, 이 요소 안에 또 다른 html 요소를 넣고싶다면, 다음과 같이 할 수 있습니다.
```js
new Dom("fieldset").add(
    new Dom("legend", {text: "this is legend"}),
    new Dom("input", {type: "button", value: "click here", onclick: () => {
        alert("clicked");
    }})
)
```
---
#### 1-2. children(num)
> **num**에 해당하는 **자식 HTMLElement요소**를 반환합니다.    
> (해당 num번째 children이 없다면, null을 반환합니다.)  
예시:
```js
new Dom("fieldset").add(
    new Dom("legend", {text: "this is legend"}),
    new Dom("input", {type: "button", value: "click here", onclick: () => {
        alert("clicked");
    }})
).children(1)

// return되는 객체
<input type="button" value="click here">
```
---
#### 1-3. add(...dom)
> **dom**에 전달된 **Dom** 또는 **Dom 배열**을 해당 Dom의 **자식 요소**로 추가합니다.   
예시:
```js
new Dom("form", {onsubmit: e => {
    e.preventDefault();
    console.log(e.target);
}}).add(
    new Dom("fieldset").add(
        new Dom("legend", {text: "this is legend"}),
        new Dom("input", {type: "submit", value: "submit"})
    )
)

// return되는 객체
<form>
    <fieldset>
        <legend>this is legend</legend>
        <input type="submit" value="submit">
    </fieldset>
</form>
```
---
#### 1-4. reset(...dom) 
> 해당 **Dom**의 자식 요소를 **모두 제거**하고 dom에 전달된 **Dom** 또는 **Dom 배열**을 추가합니다.  
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

// return되는 객체
<form>
    <input type="text" placeholder="was replaced">
    <input type="submit" value="submit">
</form>
```
---
#### 1-5. **@deprecated** copy(count)
> **이 메서드는 jh 1.2.0 이후로 지원이 중단됩니다.**  
> **count** 개수만큼 현재 **Dom**을 **복사**한 **Dom 배열**을 반환합니다.  
예시:
```js
new Dom("p", {text: "hello!"}).copy(5)

// 리턴되는 객체
[<p>hello!</p>, <p>hello!</p>, <p>hello!</p>, <p>hello!</p>, <p>hello!</p>]
```
---
#### 1-6. remove(num)
> **num**에 해당하는 **자식 요소**를 **제거**합니다.   
예시:
```js
new Dom("fieldset").add(
    new Dom("legend", {text: "this is legend"}),
    new Dom("input", {type: "button", value: "click here", onclick: () => {
        alert("clicked");
    }})
).remove(1)

// return되는 객체
<fieldset>
    <legend>this is legend</legend>
</fieldset>
```
---
#### 1-7. set(additional)
> **additional**에 전달된 **속성과 값**을 해당 **Dom**에 **설정**합니다.  
예시:
```js
let color = "green";
new Dom("span").set({text: "hello!", style: `color: ${color}`});

// return되는 객체
<span style="color: green">hello!</span>
```
---
### 2. $(node, additional) : Dom
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
### 3. scan(selector) : document.querySelector : document.querySelectorAll
> **scan** 함수는 **selector**를 기반으로 **HTMLElement**를 **검색**하는 함수입니다.  
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
> 예시:  
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
### 4. snipe(selector) : Dom
> **snipe** 함수는 **selector**를 기반으로 **HTMLElement**를 **검색**하여 **Dom 객체**로 반환하는 함수입니다.  
> snipe 함수는 다음과 같은 **매개변수**를 받습니다.
  
- **selector**: 검색할 요소의 **선택자**입니다.  
  
scan 함수는 다음과 같은 동작을 수행합니다:  
  
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

// return되는 객체
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
### 5. Fragment: class;
> **Fragment**는 **<fragment></fragment> 태그**와 별도의 **Dom 요소**들로 정의된 **fragment**를 관리하는 클래스입니다.  
> **html 내의 별도의 <fragment> 태그랑 같이 사용해야 합니다.**  
> Fragment 클래스 안에는, 다음과 같은 요소들이 있습니다.  
> 1. constructor(view, ...fragment)  
> **view**는 **<fragment></fragment>의 rid 속성값**으로, **문자열**입니다. **fragment**는 **Dom 요소**들을 전달받는 **가변 인자**입니다.  
> 2. registAction(action)  
> **launch** 동작이 실행될 때, 추가로 실행할 **action**을 등록하는 메서드입니다. **action**은 **function**입니다.  
> 3. launch()  
> **Fragment**를 **전환**하는 메서드입니다. 등록된 **action**을 실행하고, 해당 **view**에 있는 **<fragment></fragment> 태그**를 **fragment**로 **전환**합니다.  
---
#### 5-1. constructor(view, ...fragment)
> 우선 Fragment 클래스를 이용해 동적으로 요소 swiping을 하는 예제는 다음과 같습니다.  
> **(다소 복잡한 Dom 구문이 포함되어 있습니다. 1번 문단을 참고해주세요.)**  
```js
/* index.html */
<fragment rid="fragmentView"></fragment>

/* fragment.js */
const mainFragment = new Fragment("fragmentView", $("fieldset").add(
    $("legend", {text: "first fragment", style: "color: red;"}),
    $("input", {type: "button", value: "go to second fragment", onclick: () => {
        secondFragment.launch();
    }})
)).launch();
// Fragment.launch()를 하게 되면, 해당 프레그먼트가 선택된 상태로 만들어 집니다.

const secondFragment = new Fragment("fragmentView", $("h1", {text: "rest floor", style: "color: green"}),
$("p", {text: "just test case..."}),
$("input", {type: "button", value: "go to first fragment", onclick: () => {
    mainFragment.launch();
}}))
```
---
#### 5-2. registAction(action)
> 만약, Fragment가 **launch**될 때, 추가로 실행되길 원하는 동작이 있다면, 이 **registAction**을 이용하실 수 있습니다.  
> **action**에는 **function**이나 **lambda function**이 올 수 있지만, 추가로 실행되길 원하는 동작에 **this**를 이용하는 동작이 있다면 가급적 **function**을 넘겨주는 것을 권장합니다.  
> 예시: (9-1의 예시를 조금 수정합니다.)  
> ([livedata.js](https://github.com/hynrusang/program/js-lib/main/1.0.0/livedata.js)를 추가로 이용합니다.)  
```js
/* index.html */
<fragment rid="fragmentView"></fragment>

/* fragment.js */
const state = new LiveData("first");
state.observer = function () {
    alert(`${this.get()} Fragment is stating now...`);
}
const mainFragment = new Fragment("fragmentView", $("fieldset").add(
    $("legend", {text: "first fragment", style: "color: red;"}),
    $("input", {type: "button", value: "go to second fragment", onclick: () => {
        secondFragment.launch();
    }})
)).registAction(() => {
    state.set("first");
}).launch();
// Fragment.launch()를 하게 되면, 해당 프레그먼트가 선택된 상태로 만들어 집니다.

const secondFragment = new Fragment("fragmentView", $("h1", {text: "rest floor", style: "color: green"}),
$("p", {text: "just test case..."}),
$("input", {type: "button", value: "go to first fragment", onclick: () => {
    mainFragment.launch();
}})).registAction(() => {
    state.set("second");
})
```
---
#### 5-3. launch()
> **launch**는 **현재 Fragment**를 **해당 Fragment**로 대체하는 함수입니다.  
> 대체될 **타겟 Fragment**는 **rid**가 **Fragment의 첫번째 인자**와 동일한 **<fragment> element**입니다.  
> 예시:  
```js
// index.html
<fragment rid="target"></fragment>

// fragment.js
const mainFragment = new Fragment("target", $("h1", {text: "hello, world", style: "color: red"}))
const secondFragment = new Fragment("target", $("h1", {text: "hi, world!", style: "color: blue"}))
mainFragment.launch();
```
---
### 6. is(target, Class) : boolean
> is 함수는 **target**이 **특정 Class**의 **인스턴스**인지 또는 **특정 Type**와 **동일**한 타입인지 **확인**하는 함수입니다.  
> is 함수는 다음과 같은 매개변수를 받습니다.  
  
- **target**: 확인할 **대상**입니다.  
- **Class**: 확인할 **클래스 또는 타입**입니다.  
  
is 함수는 다음과 같은 동작을 수행합니다:  
  
1. target이 **객체 타입**인 경우:  
- target이 **Class**의 **인스턴스**인지 확인합니다. (**instanceof** 연산자를 사용하여 확인)  
2. target이 **원시 타입** 경우:  
- target의 **타입**이 **Class(Type)**와 **일치**하는지 확인합니다. (**typeof** 연산자를 사용하여 확인)  
예시:  
```js
is($("div"), Dom); // true
is($("div"), Object) // true
is(4, Object) // false
is(4, Number) // true
is("some string", String) // true
is("some string", Number) // false
```
---
### 7. async wait(millisecond) : Promise<void>
> **wait** 함수는 **시간(밀리초)**만큼 **대기**하는 **Promise 객체**를 생성하는 함수입니다.  
> wait 함수는 다음과 같은 **매개변수**를 받습니다.
  
- **millisecond**: 대기할 **시간**을 나타내는 **밀리초 단위**의 **정수**입니다.  
  
wait 함수는 다음과 같은 동작을 수행합니다:  
  
1. **setTimeout** 함수를 사용하여 **주어진 시간(millisecond)** 이후에 **Promise의 코드 (null)**를 실행합니다.  
2. **Promise 객체 (Promise\<void\>)**를 반환합니다.  
예시:  
```js
const waitTest = async () => {
    await wait(1000);
    console.log(true);
}
waitTest();

// result
...
true
```
---
### 8. getIndex(parent, child) : number
> **getIndex** 함수는 **parent** 내에서 **child**의 **인덱스**를 가져오는 함수입니다.  
> getIndex 함수는 다음과 같은 **매개변수**를 받습니다.  
  
- **parent**: **Array\<T\>** 또는 **HTMLElement**입니다.  
- **child**: **T** 또는 **HTMLElement**입니다.  
> parent가 **array**인지, **HTMLElement**인지는 중요하지 않습니다.  
  
getIndex 함수는 다음과 같은 동작을 수행합니다:  
  
1. **parent**가 **HTMLElement**인 경우:  
- **parent**의 **children 배열**에서 **child**의 **인덱스**를 찾습니다. (Array.prototype.indexOf를 사용하여 검색)  
2. **parent**가 **Array**인 경우:
- **parent 배열**에서 **child**의 **인덱스**를 찾습니다. (Array.prototype.indexOf를 사용하여 검색)  
예시:  
```js
// test.html
<div id="parent_element">
    <div></div>
    <div></div>
    <div id="my-element"></div>
    <div></div>
</div>

// main.js
getIndex(document.querySelector("#parent_element"), document.querySelector("#my-element")); // 2
getIndex([3, 5, 6, 7, 9], 7); // 3
```
---
> 그 외, **isEmpty, count, in, last** 등의 **prototype**에 관한 내용은 소스코드 란을 참고하세요.
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
>   
> create string.property.isEmpty(): boolean;  
> create array.property.isEmpty(): boolean;  
> create String.prototype.in(data): boolean;  
> create array.prototype.in(data): boolean;  
> create string.property.count(data): number;  
> create array.property.count(data): number;  
> create string.property.last(): char;  
> create array.property:last(): any;  
> 
> @deprecated loading;
---
> 1.1.0  
> combine class DomDefault, DomExpert to Dom;  
> create class Fragment;  
>   
> @remove loading;  
> @deprecated Dom.copy(count);  
> @update is;
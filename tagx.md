# ![JavaScript icon](https://github.com/hynrusang/js-lib/blob/main/resource/logo.png) Tagx Util (TU)
- [이전으로](https://github.com/hynrusang/js-lib)
- [소스코드](https://github.com/hynrusang/js-lib/blob/main/1.0.0/tagx.js)
---
- **이 문서는 developer 버전인 tagx 1.0.0을 다룹니다.**  
- **현재 prerelease 버전은 tagx 1.0.0입니다.**
- **현재 release 버전은 tagx x.x.x입니다.**
## 정보
- html 내에서 **html binding**과 같은 유용한 기능을 보다 쉽게 사용할 수 있게 해줍니다.
- (사용방법은 아래의 요소 탭을 참고하세요.)

## 요소
<img src="https://github.com/hynrusang/js-lib/blob/main/resource/scene_binder.png">  
  
### 1. **@1.0.0** Binder
> **Binder** 클래스는 **HTMLElement**들을 **var, exp attributes**를 이용하여  
> 실시간으로 **binding**하는 기능을 제공하는 **static** 클래스입니다.  
> Binder 클래스 안에는, 다음과 같은 요소들이 있습니다.  
>  
> 1. **@1.0.0** find(id)  
> - **this.#bindlist[id]: HTMLElement**를 반환합니다.
> ---
> 2. **@1.0.0** define(id, value)  
> - **this.#bindlist[id]** 에 **innerText**가 **value**인 **virtual dom**을 동적으로 할당합니다.
> ---
> 3. **@1.0.0** update(id, value)  
> - **this.#bindlist[id]: HTMLElement** 의 **value || innerText**를 **value**로 다시 설정합니다.
> - **this.#bindlist[id]: HTMLElement** 와 연결된 모든 **HTMLElement**를 동기화합니다.
---
#### 1-0. how to use
> (이 방식은 **dynamic.js**나 **document.appendChild**를 이용해 동적으로 추가되는 **HTMLElement**들에 대해서도 적용됩니다.)  
> 우선 다음과 같이, **html** 문서 내에 다음과 같이 **Binding**할 주체를 작성합니다.  
```html
<input type="text" value="binding example" var="a">
<input type="number" value="6" var="b">
<input type="number" value="3" var="c">

// Binder.#bindlist
Binder.#bindlist["a"] = <input type="text" value="binding example" var="a">
Binder.#bindlist["b"] = <input type="number" value="6" var="b">
Binder.#bindlist["c"] = <input type="number" value="3" var="c">
```
> 이를 조금 더 간단히 한다면, 다음과 같이 할 수 있습니다.
```js
<input type="text" var="a=binding example">
<input type="number" var="b=6">
<input type="number" var="c=3">
```
> 그 다음, **Binding**된 요소를 이용해 **update**할 요소들을 다음과 같이 작성합니다.
```js
<p exp="a->action name = {a}"></p>
<p exp="a b c->{a}: {b} + {c} = {b + c}"></p>
```
> 그러면, 자동으로 **update** 되는 요소들의 **innerText** (요소가 **input** 또는 **textarea** 이라면 **value**)가 다음과 같이 수정됩니다.
```js
action name = binding example
binding example: 6 + 3 = 9
```
> 만약, **user**측이 아닌, **script** 상에서 **Binding**할 주체의 **value**나 **innerText**를 수동으로 설정해야 하는 경우,  
> **Binder.update**를 이용할 수 있습니다. 
```js
Binder.update("a", "binding example 2");

// innerTexts
action name = binding example 2
binding example 2: 6 + 3 = 9
```
---
#### 1-1. **@1.0.0** find(id)  
> **BindList**에서 **id**에 위치한 **HTMLElement**를 반환합니다.  
  
예시:
```html
<input type="number" var="a=2">
<input type="number" var="b=3">
<p exp="a b->a = {a},  b = {b},  a + b = {a + b}"></p>

// js
console.log(Binder.find("a"));

// console
<input type="number" var="a=2">
```
---
#### 1-2. **@1.0.0** define(id, value)
> **id**와 **value**를 가지고, **unvisiable** 상태인 **virtual dom**을 **Bindlist**에 **append**합니다.  
> **define**으로 정의된 **virtual dom**에도 **update**를 사용할 수 있습니다.  
  
예시:
```js
Binder.define("test", "32to");

const element = document.createElement("p");
element.setAttribute("exp", "test->test data: {test}");
document.body.appendChild(element);

// element.innerText
test data: 32to
```
---
#### 1-3. **@1.0.0** update(id, value)
> **BindList**에서 **id**에 위치한 **HTMLElement**의 **value || innerText**를 **value**로 업데이트 한 후,  
> **SyncList**에서 **id**와 관련된 **HTMLElement**의 **value || innerText**를 **exp attributes**대로 다시 설정합니다.  
  
예시:
```html
<input type="number" var="a=2">
<input type="number" var="b=3">
<p exp="a b->a = {a},  b = {b},  a + b = {a + b}"></p>

// js
Binder.update("a", 7);

// p.innerText
a = 7, b = 3, a + b = 10
```
---
> 1.0.0  
> implement HTMLElement::Binding;  
> create static class Binder;  

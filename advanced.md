# ![JavaScript icon](https://github.com/hynrusang/js-lib/blob/main/resource/logo.png) Advanced Prototype (AP)
- [이전으로](https://github.com/hynrusang/js-lib/tree/main)
- [소스코드](https://github.com/hynrusang/js-lib/blob/main/1.1.0/advanced.js)
---
- **이 문서는 developer 버전인 1.0.0을 다룹니다.**  
- **현재 prerelease 버전은 1.0.0입니다.**
- **현재 release 버전은 none입니다.**
## 정보
- 기존의 js를 확장해서 더 융통성있게 사용할 수 있도록 해줍니다.
- (사용방법은 아래의 요소 탭을 참고하세요.)

## 요소
### 1. **@1.0.0** is(target, Class) : boolean
> is 함수는 **target**이 **특정 Class**의 **인스턴스**인지 또는 **특정 Type**와 **동일**한 타입인지 **확인**하는 함수입니다.  
> is 함수는 다음과 같은 매개변수를 받습니다.  
  
- **target**: 확인할 **대상**입니다.  
- **Class**: 확인할 **클래스 또는 타입**입니다.  
  
is 함수는 다음과 같은 동작을 수행합니다:  
  
1. target이 **객체 타입**인 경우:  
- target이 **Class**의 **instance**인지 확인합니다. (**instanceof** 연산자를 사용하여 확인)  
2. target이 **원시 타입**인 경우:  
- target의 **Type**이 **Class**와 **일치**하는지 확인합니다. (**typeof** 연산자를 사용하여 확인)  
  
예시:  
```js
is($("div"), Dom);
is($("div"), Object);
is(4, Object);
is(4, Number);
is("some string", String);
is("some string", Number);

// console
true
true
false
true
true
false
```
---
### 2. **@1.0.0** async wait(millisecond) : Promise\<void\>
> **wait** 함수는 **millisecond**만큼 **대기**하는 **Promise 객체**를 생성하는 함수입니다.  
> wait 함수는 다음과 같은 **매개변수**를 받습니다.
  
- **millisecond**: 대기할 **시간**을 나타내는 **밀리초 단위**의 **정수**입니다.  
  
wait 함수는 다음과 같은 동작을 수행합니다:  
  
1. **setTimeout** 함수를 사용하여 **millisecond** 이후에 **null**를 실행합니다.  
2. **빈 Promise 객체**를 반환합니다.  
  
예시:  
```js
(async () => {
    await wait(1000);
    console.log(true);
})()

// result
...
true
```
---
### 3. **@1.0.0** **@deprecated**  getIndex(parent, child) : number  
> **이 function은 advanced 1.2.0부터 사용 중단됩니다.**  
> **(HTMLElement || NodeList).prototype.indexOf를 대신 이용하십시오.**  
> **getIndex** 함수는 **parent** 내에서 **child**의 **인덱스**를 가져오는 함수입니다.  
> getIndex 함수는 다음과 같은 **매개변수**를 받습니다.  
  
- **parent**: **Array\<T\>** 또는 **HTMLElement**입니다.  
- **child**: **T** 또는 **HTMLElement**입니다.  
  
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

// script
getIndex(document.querySelector("#parent_element"), document.querySelector("#my-element"));
getIndex([3, 5, 6, 7, 9], 7);

// console
2
3
```
---
### 4. prototype
#### 4-1. **@1.0.0** (String || Array).prototype.isEmpty
> 이 메서드는 **(String || Array)** 이 **empty**인지의 여부를 반환합니다.  
> 함수 내부에서는 다음과 같은 작업을 수행합니다:  
  
1. 현재 값을 **copy**한 **temp dataset**을 만듭니다.  
2. **ignore** 가변 매개변수를 받아 **temp dataset**에서 **해당 (String || element)** 을 **모두** 지웁니다.  
2. **temp dataset**의 **length**가 0인지 반환합니다.  
  
예시:
```js
"".isEmpty();
"d".isEmpty();
"   ".isEmpty();
"     ".isEmpty(" ");

[].isEmpty();
[3].isEmpty();
[null, undefined].isEmpty();
[null, undefined, null, ""].isEmpty(null, undefined, "");

// result
true
false
false
true

true
false
false
true
```
---
#### 4-2. **@1.1.0** (HTMLElement|| NodeList).prototype.indexOf  
> 이 메서드는 [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md)와의 호완성을 목적으로 확장되었습니다.  
> 함수 내부에서는 다음과 같은 작업을 수행합니다:  

1. **(HTMLElement.children || NodeList)** 를 **Array**로 변환합니다 **(실제 값이 변하진 않습니다.)**.  
2. **indexOf** 메서드를 호출하여, 해당 **child**가 위치한 **index**를 반환합니다.  
  
예시: ([dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md)를 추가로 이용합니다.)  
```js
// index.html
<main>
  <article id="page-1"></article>
  <article id="page-2"></article>
  <article id="page-3"></article>
</main>

// script
scan("main").indexOf(scan("#page-1"));
scan("!article").indexOf(scan("#page-2"));

// return 
0
1
```
---
#### 4-3. **@1.0.0** Array.prototype.add
> 이 메서드는 **Array**에서 **특정 data**을 **push**하는 메서드입니다.  
> 기존의 **push**랑 다르게, 이 메서드의 반환 타입은 **Array**입니다.  
> 함수 내부에서는 다음과 같은 작업을 수행합니다:  
  
1. 주어진 데이터를 배열에 추가하기 위해 push 메서드를 호출합니다.  
2. 변경된 배열을 반환합니다.  
  
예시:  
```js
const test = [3,5,6];
test.add(7).add(9);

// return
[3, 5, 6, 7, 9]
```
---
#### 4-4. **@1.0.0** Array.prototype.remove  
> 이 메서드는 **Array**에서 **특정 data**을 **remove**하는 메서드입니다.  
> 함수 내부에서는 다음과 같은 작업을 수행합니다:  
  
1. 제거할 값의 인덱스를 찾습니다.  
2. 만약 값이 배열 안에 존재하는 경우, 해당 인덱스를 사용하여 splice 메서드를 호출하여 값을 제거합니다.  
3. 변경된 배열을 반환합니다.  
  
예시:
```js
const test = [3,5,6,7,9,11];
test.remove(3).remove(6);
test;

// console
[5,7,9,11]
```
---
## 업데이트 내역
> 1.0.0  
> create Array.prototype.add(data): Array;  
> create Array.prototype.remove(data): Array;  
> create String.property.isEmpty(...ignore): boolean;  
> create Array.property.isEmpty(...ignore): boolean;  
>  
> @get is(target, classname): boolean from [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md);  
> @get wait(millisecond): Promise<void> from [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md);  
> @get getIndex(parent, child): number from [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md);  
---
> 1.1.0  
> create HTMLElement.prototype.indexOf(searchElement, fromIndex): Number;  
> create NodeList.prototype.indexOf(searchElement, fromIndex): Number;  
>  
> @deprecated getIndex(parent, child): number;

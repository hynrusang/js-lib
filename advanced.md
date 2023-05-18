# ![JavaScript icon](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/33px-Unofficial_JavaScript_logo_2.svg.png) Advancedment (more js function, prototype)
- [이전으로](https://github.com/hynrusang/js-lib/tree/main)
- [소스코드](https://github.com/hynrusang/js-lib/blob/main/1.0.0/advanced.js)
---

## 정보
- 이건 js의 기능들을 더 확장하고, 더 편리한 기능, 프로토타입을 추가해주는 js 파일 입니다.  
- (사용방법은 아래의 요소 탭을 참고하세요.)

## 요소
### 1. is(target, Class) : boolean
> is 함수는 **target**이 **특정 Class**의 **인스턴스**인지 또는 **특정 Type**와 **동일**한 타입인지 **확인**하는 함수입니다.  
> is 함수는 다음과 같은 매개변수를 받습니다.  
  
- **target**: 확인할 **대상**입니다.  
- **Class**: 확인할 **클래스 또는 타입**입니다.  
  
is 함수는 다음과 같은 동작을 수행합니다:  
  
1. target이 **객체 타입**인 경우:  
- target이 **Class**의 **인스턴스**인지 확인합니다. (**instanceof** 연산자를 사용하여 확인)  
2. target이 **원시 타입** 경우:  
- target의 **타입**이 **Class**와 **일치**하는지 확인합니다. (**typeof** 연산자를 사용하여 확인)  
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
### 2. async wait(millisecond) : Promise<void>
> **wait** 함수는 **millisecond**만큼 **대기**하는 **Promise 객체**를 생성하는 함수입니다.  
> wait 함수는 다음과 같은 **매개변수**를 받습니다.
  
- **millisecond**: 대기할 **시간**을 나타내는 **밀리초 단위**의 **정수**입니다.  
  
wait 함수는 다음과 같은 동작을 수행합니다:  
  
1. **setTimeout** 함수를 사용하여 **millisecond** 이후에 **null**를 실행합니다.  
2. **빈 Promise 객체**를 반환합니다.  
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
### 3. getIndex(parent, child) : number
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
### 4. prototype
#### 4.1 String.prototype.in
> 이 메서드는 **문자열** 내에서 **특정 데이터**를 검색하여 **해당 데이터가 존재**하는지 여부를 반환합니다.  
> 데이터가 **존재**하면 **true**를 반환하고, **그렇지 않으면** **false**를 반환합니다.  
예시:  
```js
"aaaaAaaaaa".in("A")
"aaaaAaaaaa".in("a")
"aaaaAaaaaa".in("b")

// result
true
true
false
```
---
#### 4.2 Array.prototype.in
> 이 메서드는 **배열** 내에서 **특정 데이터**를 검색하여 **해당 데이터가 존재**하는지 여부를 반환합니다.  
> 데이터가 **존재**하면 **true**를 반환하고, **그렇지 않으면** **false**를 반환합니다.  
예시:  
```js
[3,5,6,7].in(7)
["hello", 7, 8, "9"].in(8)
["hello", 7, 8, "9"].in(9)

// result
true
true
false
```
---
#### 4-3. String.prototype.isEmpty
> 이 메서드는 **문자열**이 **비어 있는지** 여부를 확인하여 비어 있으면 **true**를 반환하고,  
> **그렇지 않으면 false**를 반환합니다.
예시:
```js
"".isEmpty()
"d".isEmpty()
" ".isEmpty()

// result
true
false
false
```
---
#### 4-4. Array.prototype.isEmpty
> 이 메서드는 **배열**이 **비어 있는지** 여부를 확인하여 비어 있으면 **true**를 반환하고,  
> **그렇지 않으면 false**를 반환합니다.  
예시:
```js
[].isEmpty()
[3].isEmpty()
[null, undefined].isEmpty()

// result
true
false
false
```
---
#### 4-5. Array.prototype.push
> **(이 메서드는 기존의 Array.prototype.push의 반환값을 재정의한 prototype입니다.)**  
> 이 메서드는 **주어진 데이터**를 배열의 끝에 추가하고, **수정된 배열**을 반환합니다.  
예시:
```js
// before
[3,5,6,7,8].push(2)
// return
6

// renew
[3,5,6,7,8].push(2)
// result
[3,5,6,7,8,2]
```
---
## 업데이트 내역
> 1.0.0  
> get is(target, classname): boolean from [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md);  
> get wait(millisecond): Promise<void> from [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md);  
> get getIndex(parent, child): number from [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md);  
>   
> get string.property.isEmpty(): boolean from [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md);  
> get array.property.isEmpty(): boolean from [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md);  
> get String.prototype.in(data): boolean from [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md);  
> get array.prototype.in(data): boolean from [dynamic.js](https://github.com/hynrusang/js-lib/blob/main/dynamic.md);  

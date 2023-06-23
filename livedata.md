# ![JavaScript icon](https://github.com/hynrusang/js-lib/blob/main/resource/logo.png) LiveData Manager (LM)
- [이전으로](https://github.com/hynrusang/js-lib)
- [소스코드](https://github.com/hynrusang/js-lib/blob/main/1.2.0/livedata.js)
---
- **이 문서는 developer 버전인 1.2.0을 다룹니다.**  
- **현재 prerelease 버전은 1.1.0입니다.**
- **현재 release 버전은 1.1.0입니다.**
## 정보
- js에서 값의 변화를 관측하는 **LiveData**를 비롯한 여러 기능들을 사용할 수 있게 해줍니다.  
- (사용방법은 아래의 요소 탭을 참고하세요.)

## 요소
<img src="https://github.com/hynrusang/js-lib/blob/main/resource/scene_pointer.png">  
  
### 1. @1.2.0 Pointer: Class
> **Pointer**는 **primity type**인 객체를 감싸서 **값** 뿐만 아닌, **주소**의 참조도 가능케 하는 **Class**입니다.  
> Pointer 클래스 안에는, 다음과 같은 요소들이 있습니다.  
>  
> 1. constructor(data: **any**, type = **Number || String || Array || Object || null**)  
> **Pointer**의 생성자입니다.
> ---
> 2. **@1.1.0** **setter** value  
> - **this.#data**에 값을 설정합니다.
> ---
> 3. **@1.1.0** **getter** value
> - **this.#data: any**를 반환합니다.
---
<img src="https://github.com/hynrusang/js-lib/blob/main/resource/scene_livedata.png">  
  
### 1. @1.0.0 LiveData: Class
> **LiveData**는 **데이터를 관리**하고, 값이 변경되면 **observer**를 통해 알려주는 **Class**입니다.  
> LiveData 클래스 안에는, 다음과 같은 요소들이 있습니다.  
>  
> 1. constructor(data: **any**, type = **Number || String || Array || Object || null**, observer: **Function**)  
> **LiveData**의 생성자입니다.
> - **data**는 **LiveData의 초기 데이터**입니다.
> - **type**은 **LiveData에 들어갈 데이터들의 유형**입니다.
> - **observer**는 **LiveData의 value가 변할때 실행될 함수**입니다.
> ---
> 2. **@1.0.0** **@deprecated** registObserver(observer)  
> **(이 function은 1.3.0부터 사용 중단됩니다.**  
> **[constructor third param](https://github.com/hynrusang/js-lib/blob/main/livedata.md#1-1-constructordata-any-type--number--string--array--object--null-observer-function)을 대신 이용하십시오.)**  
> ---
> 3. **@1.0.0** **@deprecated** dispatchObserver()  
> **가급적이면 사용하지 않는 것을 권장드립니다. (의도치 않은 동작 발생 가능)**
> - **this.#observer**를 실행합니다.
> ---
> 4. **@1.1.0** **setter** value  
> - **this.#data**에 값을 설정합니다.
> ---
> 5. **@1.1.0** **getter** value
> - **this.#data: any**를 반환합니다.
---
#### 1-1. constructor(data: **any**, type = **Number || String || Array || Object || null**, observer: **Function**)
> 우선 간단하게 **LiveData** 요소를 만듭니다.  
> **(여기서는 초기 데이터로 3을 넣어주겠습니다.)**  
```js
const db = new LiveData(3);
```
> 만약, 이 **LiveData**가 **Number**의 값만 받게 하고 싶다면, 다음과 같이 할 수 있습니다.  
```js
const db = new LiveData(3, Number);
db.value = "str"; // throw TypeError;
```
> 만약, 이 **LiveData**가 **change** 될 때마다 해당 값을 **console**에 출력하고 싶다면, 다음과 같이 할 수 있습니다.  
```js
const db = new LiveData(3, Number, function () {
  console.log(this.value);
})
```
> 이제 이 db의 값을 **변경**하면, 콘솔에 해당 값이 출력됩니다.  
```js
db.value = 7;

// console
7
```
> 값이 이전과 **다르지 않다면**, observer가 **실행되지 않습니다.**  
```js
db.value = 7;

// console
```
---
#### 1-2. **@1.0.0** **@deprecated** registObserver(observer)  
> **(이 function은 1.2.0부터 사용 중단됩니다.**  
> **[constructor third param](https://github.com/hynrusang/js-lib/blob/main/livedata.md#1-1-constructordata-any-type--number--string--array--object--null-observer-function)을 대신 이용하십시오.)**  
  
예시:
```js
const db = new LiveData("data", String).registObserver(function () { console.log(this.value); });  
db.value = "data renew";  

// console
data renew
```
---
#### 1-3. **@1.0.0** **@deprecated** dispatchObserver()  
> **가급적이면 사용하지 않는 것을 권장드립니다. (의도치 않은 동작 발생 가능)**
1. **this.#observer**를 실행합니다.
  
예시:  
```js
const data = new LiveData(32, Number, function () {
    console.log(this.value)
});
data.dispatchObserver();

// console
32
```
---
#### 1-4. **@1.1.0** **setter** value  
1. **this.#data**에 값을 설정합니다.
- **this.#allowed**가 **not null**이고, **data**의 타입이 **this.#allowed**와 일치하지 않는 경우, **TypeError**를 **throw**합니다.  
**(this.#data는 업데이트되지 않습니다.)**
- **이전 데이터**와 **현재 데이터**가 변경되었는지 비교하여 **isChanged** 변수에 저장합니다.  
**(data가 primity type인 경우에만 정상적으로 작동합니다.)**
- **this.#data**를 **data**로 설정합니다.
- **isChanged**가 **true**이고 **this.#observer**가 **Function**인 경우 **this.#observer**를 실행합니다.
  
예시:  
```js
const db = new LiveData([3, 5, 6], Array, function () {
    console.log("data was changed!");
});
db.value = [2, 4, 8];
db.value = [6, 7, 3];

// console
data was changed!
data was changed!
```
---
#### 1-5. **@1.1.0** **getter** value
1. **this.#data: any**를 반환합니다.
- **this.#data**가 **Array**인 경우, 복사된 배열을 반환합니다.
- **this.#data**가 **Object**인 경우, 복사된 객체를 반환합니다.
- **그 외의 경우**, **this.#data**를 반환합니다.
  
예시:
```js
const db = new LiveData([3, 5, 6], Array, function () {
    console.log("data was changed!");
});
console.log(db.value); 

// console
[3, 5, 6]
```
---
<img src="https://github.com/hynrusang/js-lib/blob/main/resource/scene_livedatamanager.png">  
  
### 2. @1.1.0 LiveDataManager: Class  
> **LiveDataManager**는 여러 개의 **LiveData** 객체들을 동시에 관리하는데 사용되는 **Class**입니다.  
> 주어진 **livedataObject**를 기반으로 **init**되며, 각 **LiveData** 인스턴스는 **id**와 매핑됩니다.  
> **LiveDataManager** 클래스 안에는, 다음과 같은 요소들이 있습니다.  
>  
> 1. constructor(livedataObject: **object**, editable = **true**)  
> **LiveDataManager**의 생성자입니다.
> - **livedataObject**는 **LiveData 객체들로 이루어진 객체**입니다.
> - **editable**은 **외부에서 LiveDataManager가 관리하고 있는 LiveData들에 대한 접근 및 수정가능 여부**입니다.
> ---
> 2. **@1.1.0** **getter** id
> - **this.#livedataObject: object**를 반환합니다.
> ---
> 3. **@1.1.0** value(id: **any**)
> - **this.#livedataObject[id].value: any**를 반환합니다.
> ---
> 4. **@1.1.0** value(id, data)
> - **this.#livedataObject[id]: LiveData** 의 **[setter](https://github.com/hynrusang/js-lib/blob/main/livedata.md#1-4-110-setter-value)** 를 호출합니다.
> ---
> 5. **@1.1.0** toArray()
> - **this.#livedataObject: object by Array**를 반환합니다.
> ---
> 6. **@1.1.0** toObject()  
> - **this.#livedataObject: object**를 반환합니다.
> ---
---
#### 2-1. constructor(livedataObject: **object**, editable = **true**)  
> 우선, 간단하게 **3**개의 **LiveData** 객체를 관리하는 **LiveDataManager**를 만들어 보겠습니다.  
```js
const gollum = function () { console.log(`gollum! (${this.value})`); }
const db = new LiveDataManager({
    id: new LiveData(32, Number, gollum),
    name: new LiveData("hynrusang", String, gollum),
    data: new LiveData([], Array, gollum)
});
```
> 이제 이 **LiveDataManager**의 **id** 필드의 값을 **edit**해보도록 하겠습니다.  
```js
db.value("id", 56);

// console
gollum! (56)
```
> 만약, **LiveDataManager**의 필드 값을 **edit** 하는 것이 아닌, 단순히 **get** 하고 싶다면, 다음과 같이 하면 됩니다.  
```js
db.value("name");

// console
hynrusang
```
> 만약, **LiveDataManager**의 필드를 **add**하거나 **edit** 하고 싶다면, 다음과 같이 하면 됩니다.  
> **(만약, LiveDataManager의 constructor의 second 인자에, false를 넘겨주었다면, SyntaxError가 발생합니다.)**
```js
// case editable == true
const gollum = function () { console.log(`gollum! (${this.value})`); }
const db = new LiveDataManager({
    id: new LiveData(32, Number, gollum),
    name: new LiveData("hynrusang", String, gollum),
    data: new LiveData([], Array, gollum)
});

db.id.name; // getter
db.id.newData = new LiveData("hello, world!", null, gollum); // setter
db.id;

// console
LiveData {#data: 'hynrusang', #observer: ƒ, #allowed: ƒ, registObserver: ƒ, dispatchObserver: ƒ, …}
{id: LiveData, name: LiveData, data: LiveData, newData: LiveData}

// case editable == false
const gollum = function () { console.log(`gollum! (${this.value})`); }
const db = new LiveDataManager({
    id: new LiveData(32, Number, gollum),
    name: new LiveData("hynrusang", String, gollum),
    data: new LiveData([], Array, gollum)
}, false);

db.id.name; // SyntaxError
db.id.newData = new LiveData("hello, world!", gollum); // SyntaxError
db.id; // SyntaxError

// console
Uncaught SyntaxError: This LiveDataManager cannot be accessed or modified externally.
```
---
#### 2-2. **@1.1.0** **getter** id
1. **this.#livedataObject: object**를 반환합니다.
- 만약 **this.#editable**이 **false**인 경우 **SyntaxError**를 **throw**합니다.
- 만약 **this.#editable**이 **true**인 경우(default), **this.#livedataObject: object**를 반환합니다.
  
예시:
```js
const gollum = function () { console.log(`gollum! (${this.value})`); }
const db = new LiveDataManager({
    id: new LiveData(32, Number, gollum),
    name: new LiveData("hynrusang", String, gollum),
    data: new LiveData([], Array, gollum)
});
console.log(db.id.data);
db.id.newData = new LiveData("hello, world!").registObserver(gollum);
console.log(db.id);

// console
LiveData {#data: Array(0), #allowed: ƒ, #observer: ƒ, registObserver: ƒ, dispatchObserver: ƒ}
{id: LiveData, name: LiveData, data: LiveData, newData: LiveData}
```
---
#### 2-3. **@1.1.0** value(id: **any**)
1. **this.#livedataObject[id].value: any**를 반환합니다. 
  
예시:
```js
const gollum = function () { console.log(`gollum! (${this.value})`); }
const db = new LiveDataManager({
    id: new LiveData(32, Number, gollum),
    name: new LiveData("hynrusang", String, gollum),
    data: new LiveData([], Array, gollum)
});
console.log(db.value("name"));

// console
hynrusang
```
---
#### 2-4. **@1.1.0** value(id, data)
1. **this.#livedataObject[id]: LiveData** 의 **[setter](https://github.com/hynrusang/js-lib/blob/main/livedata.md#1-4-110-setter-value)** 를 호출합니다.
  
예시:
```js
const gollum = function () { console.log(`gollum! (${this.value})`); }
const db = new LiveDataManager({
    id: new LiveData(32, Number, gollum),
    name: new LiveData("hynrusang", String, gollum),
    data: new LiveData([], Array, gollum)
});
db.value("id", 56);

// console
gollum! (56)
```
---
#### 2-5. **@1.1.0** toArray()
1. **this.#livedataObject: object by Array**를 반환합니다.
- **this.#livedataObject**들을 복사한 후, **LiveData**를 포함하지 않는 **Array**로 변환하여 반환합니다.
  
예시:
```js
const gollum = function () { console.log(`gollum! (${this.value})`); }
const db = new LiveDataManager({
    id: new LiveData(32, Number, gollum),
    name: new LiveData("hynrusang", String, gollum),
    data: new LiveData([], Array, gollum)
});
console.log(db.toArray());

// console
[32, 'hynrusang', Array(0)]
```
---
#### 2-6. **@1.1.0** toObject()  
1. **this.#livedataObject: object**를 반환합니다.
- **this.#livedataObject**들을 복사한 후, **LiveData**를 포함하지 않는 **Object**로 변환하여 반환합니다.
  
예시:
```js
const gollum = function () { console.log(`gollum! (${this.value})`); }
const db = new LiveDataManager({
    id: new LiveData(32, Number, gollum),
    name: new LiveData("hynrusang", String, gollum),
    data: new LiveData([], Array, gollum)
});
console.log(db.toObject());

// console
{id: 32, name: 'hynrusang', data: Array(0)}
```
---
## 업데이트 내역
> 1.0.0  
> create class LiveData;  
>
> create JSON.unlivedata(json) : Object;  
> create Array.unlivedata(array) : Array;  
---
> 1.1.0  
> create class LiveDataManager;  
> create setter LiveData.value;  
> create getter LiveData.value;  
>  
> @deprecated LiveData.set();  
> @deprecated LiveData.get();  
> @deprecated JSON.unlivedata(json) : Object;  
> @deprecated JSON.unlivedata(json) : Object;  
---
> 1.2.0  
> @deprecated LiveData.registObserver();  
> @remove LiveData.set();  
> @remove LiveData.get();  
> @remove JSON.unlivedata(json) : Object;  
> @remove JSON.unlivedata(json) : Object;  

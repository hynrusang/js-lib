# ![JavaScript icon](https://github.com/hynrusang/js-lib/blob/main/resource/logo.png) LiveData Manager and Binding (LMB)
- [이전으로](https://github.com/hynrusang/js-lib)
- [소스코드](https://github.com/hynrusang/js-lib/blob/main/1.2.0/livedata.js)
---
- **이 문서는 developer 버전인 livedata 1.2.0을 다룹니다.**  
- **현재 release 버전은 livedata 1.1.0입니다.**  
## 정보
- 이건 **kotlin**에 있는 **LiveData**를 **js**에서 비슷하게 사용함과 동시에, **LiveDataManager(1.1.0~)** 로 여러 **LiveData**들을 손쉽게 관리하며, **Binding(1.2.0~)** 으로 동적 요소 바인딩을 쉽게 구현할 수 있게 해주는 js 파일 입니다.  
- (사용방법은 아래의 요소 탭을 참고하세요.)

## 요소
### 1. @1.0.0 LiveData: Class
> **LiveData**는 **데이터를 관리**하고, 값이 변경되면 **observer**를 통해 알려주는 **Class**입니다.  
> LiveData 클래스 안에는, 다음과 같은 요소들이 있습니다.  
>  
> 1. constructor(data): LiveData 클래스의 생성자입니다.  
> **data**는 초기 데이터로 설정됩니다.  
> **(아직은 3, "test", [2, 3], {data: true} 등의 Primitive Type만 지원합니다.)**  
>  
> 2. **@1.0.0** registObserver(observer)  
> **observer**를 **regist**하는 메서드입니다.  
> observer는 **data changed**될 시 호출될 **function**입니다.  
> **chain method**를 지원합니다.  
>
> 3. **@1.0.0** **@deprecated** dispatchObserver()  
> **observer**를 **강제 호출**하는 메서드입니다.  
> **가급적이면 사용하지 않는 것을 권장드립니다. (의도치 않은 동작 발생 가능)**  
>  
> 4. **@1.1.0** **(setter || getter)** value  
> **value**는 **setter** 또는 **getter**로, 자동으로 set, get 메서드처럼 동작합니다.  
---
#### 1-1. constructor(data)
> 우선 간단하게 **LiveData** 요소를 만듭니다.  
> **(여기서는 초기 데이터로 3을 넣어주겠습니다.)**  
```js
const db = new LiveData(3);
```
> 만약, 이 **LiveData**가 **Number**의 값만 받게 하고 싶다면, 다음과 같이 하면 됩니다.  
```js
const db = new LiveData(3, Number);

db.value = "str"; // throw TypeError;
```
> 만약, 이 **db**의 값이 변경될때마다, 해당 값을 **콘솔**에 출력하도록 하고 싶다면, 다음과 같이 하면 됩니다.  
```js
db.registObserver(function () { console.log(this.value); });
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
#### 1-2. **@1.0.0** registObserver(observer)
> **observer**를 **regist**하는 메서드입니다.  
> observer는 **data changed**될 시 호출될 **function**입니다.  
  
예시:
```js
const db = new LiveData("data", String).registObserver(function () { console.log(this.value); });  
db.value = "data renew";  

// console
data renew
```
---
#### 1-3. **@1.0.0** **@deprecated** dispatchObserver()  
> **observer**를 **강제 호출**하는 메서드입니다.  
> **가급적이면 사용하지 않는 것을 권장드립니다. (의도치 않은 동작 발생 가능)**  
  
예시:  
```js
const data = new LiveData(32, Number).registObserver(function () {
    console.log(this.value)
});
data.dispatchObserver();

// console
32
```
---
#### 1-4. **@1.1.0** **setter and getter** value  
> **value**는 **setter**와 **getter** 메서드로 이루어져 있습니다.  
> **value**의 **setter** 메서드는 다음과 같은 작업을 수행합니다:  
  
1. 주어진 **data**가 **allowed**된 유형인지 확인합니다.  
  
- 만약, 주어진 **data**가 **allowed**된 유형일 경우, 나머지 절차를 이어서 수행합니다.  
  
- **그렇지 않은 경우**, **TypeError**를 **throw**합니다.  
  
2. 주어진 **data**와 현재 **data**를 비교하여 **change** 여부를 확인합니다.  
  
3. 만약, **data**가 변경되었고, **옵저버(observer)** 가 **function**인 경우 **observer**를 호출합니다.  
  
4. 내부 **data(this.#data)** 를 주어진 **data**로 업데이트합니다.  
  
> **value**의 **getter** 메서드는 다음과 같은 작업을 수행합니다:  
  
1. 내부 **data(this.#data)** 의 유형에 따라 적절한 반환 값을 생성합니다.  
  
- 만약 **data**가 **Array**인 경우, **Array copy**을 반환합니다.  
  
- 만약 **data**가 **객체 리터럴({ })** 인 경우, **{ } copy**를 반환합니다.  
  
- 그 외의 경우에는 **data** 자체를 반환합니다.  
  
예시:  
```js
const db = new LiveData([3, 5, 6], Array).registObserver(function () {
    console.log("data was changed!");
})
db.value = [2, 4, 8]; // value setter
db.value = [6, 7, 3]; // value setter
db.value; // value getter

// console
data was changed!
data was changed!
[6, 7, 3]
```
---
### 2. @1.1.0 LiveDataManager: Class  
> **LiveDataManager**는 여러 개의 **LiveData** 객체들을 동시에 관리하는데 사용되는 **Class**입니다.  
> 주어진 **livedataObject**를 기반으로 **init**되며, 각 **LiveData** 인스턴스는 **id**와 매핑됩니다.  
> **LiveDataManager** 클래스 안에는, 다음과 같은 요소들이 있습니다.  
>  
> 1. constructor(livedataObject, editable = true)  
> **livedataObject**를 기반으로 **LiveDataManager** 인스턴스를 초기화합니다.  
> 이때, **livedataObject**는 반드시 **Object literal**이여야 하며,  
> **livedataObject**의 **value**들도 **LiveData** 인스턴스여야 합니다.  
> 그렇지 않을 시 **TypeError**가 발생합니다.  
> **editable** 매개변수는 **external**에서 **LiveDataManager**의 **livedataObject**에 대한 **access** 및 **edit**을 허용할지 여부를 결정합니다.  
> **default**는 **true**입니다.  
>  
> 2. **@1.1.0** getter id  
> **LiveDataManager**의 **#resource**를 반환합니다.  
> 만약, **editable**이 **false**면, **SyntaxError**가 발생합니다.  
>  
> 3. **@1.1.0** value(id)  
> **LiveDataManager**의 **#resource** 중, **id**와 매핑되는 **LiveData**의 **value**를 리턴합니다.  
>  
> 4. **@1.1.0** value(id, data)  
> **LiveDataManager**의 **#resource** 중, **id**와 매핑되는 **LiveData**의 **value**를 **data**로 설정합니다.  
>  
> 5. **@1.1.0** toArray()  
> **LiveDataManager**의 **#resource**를 처리하여 **LiveData**를 **포함하지 않는 Array**로 변환하는 매서드입니다.  
>  
> 6. **@1.1.0** toObject()  
> **LiveDataManager**의 **#resource**를 처리하여 **LiveData**를 **포함하지 않는 Object literal**로 변환하는 매서드입니다.  
---
#### 2-1. constructor(livedataObject, editable = true)  
> 우선, 간단하게 **3**개의 **LiveData** 객체를 관리하는 **LiveDataManager**를 만들어 보겠습니다.  
```js
const gollum = function () { console.log(`gollum! (${this.value})`); }
const db = new LiveDataManager({
    id: new LiveData(32, Number).registObserver(gollum),
    name: new LiveData("hynrusang", String).registObserver(gollum),
    data: new LiveData([], Array).registObserver(gollum)
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
    id: new LiveData(32, Number).registObserver(gollum),
    name: new LiveData("hynrusang", String).registObserver(gollum),
    data: new LiveData([], Array).registObserver(gollum)
});

db.id.name; // getter
db.id.newData = new LiveData("hello, world!").registObserver(gollum); // setter
db.id;

// console
LiveData {#data: 'hynrusang', #observer: ƒ, #allowed: ƒ, registObserver: ƒ, dispatchObserver: ƒ, …}
{id: LiveData, name: LiveData, data: LiveData, newData: LiveData}

// case editable == false
const gollum = function () { console.log(`gollum! (${this.value})`); }
const db = new LiveDataManager({
    id: new LiveData(32, Number).registObserver(gollum),
    name: new LiveData("hynrusang", String).registObserver(gollum),
    data: new LiveData([], Array).registObserver(gollum)
}, false);

db.id.name; // SyntaxError
db.id.newData = new LiveData("hello, world!").registObserver(gollum); // SyntaxError
db.id; // SyntaxError

// console
Uncaught SyntaxError: This LiveDataManager cannot be accessed or modified externally.
```
---
#### 2-2. **@1.1.0** getter id  
> **LiveDataManager**의 **#resource**를 반환합니다.  
> 만약, **editable**이 **false**면, **SyntaxError**가 발생합니다.  
  
예시: ([2-1](https://github.com/hynrusang/js-lib/blob/main/livedata.md#2-1-constructorlivedataobject-editable--true)의 초기 **db** 객체를 사용합니다.)  
```js
db.id.data;
db.id.newData = new LiveData("hello, world!").registObserver(gollum);
db.id;

// console
LiveData {#data: Array(0), #observer: ƒ, #allowed: ƒ, registObserver: ƒ, dispatchObserver: ƒ, …}
{id: LiveData, name: LiveData, data: LiveData, newData: LiveData}
```
---
#### 2-3. **@1.1.0** value(id)  
> **LiveDataManager**의 **#resource** 중, **id**와 매핑되는 **LiveData**의 **value**를 리턴합니다.  
  
예시: ([2-1](https://github.com/hynrusang/js-lib/blob/main/livedata.md#2-1-constructorlivedataobject-editable--true)의 초기 **db** 객체를 사용합니다.)  
```js
db.value("name");

// console
hynrusang
```
---
#### 2-4. **@1.1.0** value(id, data)  
> **LiveDataManager**의 **#resource** 중, **id**와 매핑되는 **LiveData**의 **value**를 **data**로 설정합니다.  
  
예시: ([2-1](https://github.com/hynrusang/js-lib/blob/main/livedata.md#2-1-constructorlivedataobject-editable--true)의 초기 **db** 객체를 사용합니다.)  
```js
db.value("id", 56);

// console
gollum! (56)
```
---
#### 2-5. **@1.1.0** toArray()  
> **LiveDataManager**의 **#resource**를 처리하여 **LiveData**를 **포함하지 않는 Array**로 변환하는 매서드입니다.  
  
예시: ([2-1](https://github.com/hynrusang/js-lib/blob/main/livedata.md#2-1-constructorlivedataobject-editable--true)의 초기 **db** 객체를 사용합니다.)  
```js
db.toArray();

// console
[32, 'hynrusang', Array(0)]
```
---
#### 2-6. **@1.1.0** toObject()  
> **LiveDataManager**의 **#resource**를 처리하여 **LiveData**를 **포함하지 않는 Object literal**로 변환하는 매서드입니다.  
  
예시: ([2-1](https://github.com/hynrusang/js-lib/blob/main/livedata.md#2-1-constructorlivedataobject-editable--true)의 초기 **db** 객체를 사용합니다.)  
```js
db.toObject();

// console
{id: 32, name: 'hynrusang', data: Array(0)}
```
---
### 3. **@1.2.0** Element Binding
> Element Binding은 **HTMLElement**의 **attribute**를 이용해 두 개 이상의 요소들을 **binding** 해주는 기능입니다.  
> **document**의 **body**의 **element**들이 **changed**될 때마다 새롭게 **Binding** 객체들을 연결하기 때문에,  
> **dynamic.js**를 이용한 동적 HTMLElement Swiping의 경우도 지원합니다.  
  
예시:
> 우선, **binding** 시킬 **HTMLElement**들의 **var** 속성에 **binding**시킬 **variable name**을 입력합니다.  
> **(var 속성에 들어가는 variable name은 고유합니다. 여러가지 HTMLElement에 동일한 variable name을 사용하지 않게 주의하세요.)**
```html
<p var="a">hello, world!</p>
<input type="text" value="2" var="b">
<input type="text" value="3" var="c">
```
> 그런 다음, 실제로 **binding**된 변수를 이용해, 동적으로 값을 변경할 **HTMLElement**들의 **exp** 속성에 **expression**을 입력합니다.
```html
<input type="text" exp="a b c->{a} {b} + {c} = {b + c}">
```
> 그러면, 초기에 **bind**된 요소들이 바뀔 때, 위의 **exp**를 연결한 **HTMLElement**의 값도 변경됩니다.
```html
hello, world! 2 + 3 = 5
```
> 만약, **external**에서 **user**가 **value**를 **change**하는 것이 아닌, **inner**에서 **element.value = ""** 같이 **value**를 **change** 하는 경우라면,  
> **element.value = ""** 처럼 **value**를 **change** 한 후, **\_Binder.sync(element);** 를 호출하면 됩니다.  
```js
// html
<input type="text" value="anonymous" var="myname">
<p exp="myname->hello, {myname}!"></p>

// js
const target = document.querySelector("input");
target.value = "";
_Binder.sync(target);
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
> implement HTMLElement Binding: attribute(var, exp)  
>  
> @removed LiveData.set();  
> @removed LiveData.get();  
> @removed JSON.unlivedata(json) : Object;  
> @removed JSON.unlivedata(json) : Object;  

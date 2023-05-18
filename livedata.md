# ![JavaScript icon](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/33px-Unofficial_JavaScript_logo_2.svg.png) LiveData (in js)
- [이전으로](https://github.com/hynrusang/js-lib)
- [소스코드](https://github.com/hynrusang/js-lib/blob/main/1.0.0/livedata.js)
---
- **이 문서는 release 버전인 livedata 1.0.0을 다룹니다.**  
- **현재 developer 버전은 livedata 1.1.0입니다.**  
## 정보
- 이건 **kotlin**에 있는 **LiveData**를 구현한 js 파일 입니다.  
- (사용방법은 아래의 요소 탭을 참고하세요.)

## 요소
### 1. @1.0.0 LiveData: Class
> **LiveData**는 **데이터를 관리**하고, 값이 변경되면 **observer**를 통해 알려주는 **클래스**입니다..  
> LiveData 클래스 안에는, 다음과 같은 요소들이 있습니다.   
> 1. constructor(data): LiveData 클래스의 생성자입니다.  
> **data**는 초기 데이터로 설정됩니다.  
> **(아직은 3, 5.6 같은 Number나 "test" 등의 String, [2, 3]같은 Array 또는 {data: true} 등의 객체 리터럴만 지원합니다.)**  
> 2. **@1.0.0** registObserver(observer)  
> **observer**를 **등록**하는 메서드입니다.  
> observer는 **데이터 변경** 시 **호출**될 함수입니다.  
> **chain method**를 지원합니다.  
> 3. **@1.0.0** **@deprecated** set(data)  
> **data**를 **설정**하는 메서드입니다.  
> **새로운 data**가 **이전 data**와 다르고, **observer**가 **함수**일 경우 **observer**를 호출합니다.  
> 4. **@1.0.0** **@deprecated** get()  
> **현재 data**를 반환하는 메서드입니다.  
---
#### 1-1. constructor(data)
> 우선 간단하게 **LiveData** 요소를 만듭니다.  
> **(여기서는 초기 데이터로 3을 넣어주겠습니다.)**  
```js
const db = new LiveData(3);
```
> 만약, 이 **db**의 값이 변경될때마다, 해당 값을 **콘솔**에 출력하도록 하고 싶다면,  
```js
db.registObserver(function () { console.log(this.get()); });
```
> 이제 이 db의 값을 **변경**하면, 콘솔에 해당 값이 출력됩니다.  
```js
db.set(7);

// console
7
```
> 값이 이전과 **다르지 않다면**, observer가 **실행되지 않습니다.**  
```js
db.set(7);

// console
```
---
#### 1-2. **@1.0.0** registObserver(observer)
> **observer**를 **등록**하는 메서드입니다.  
> observer는 **데이터 변경** 시 **호출**될 함수입니다.  
예시:
```js
const db = new LiveData("data").registObserver(function () { console.log(this.get()); });  
db.set("data renew");  

// console
data renew
```
---
#### 1-3. **@1.0.0** **@deprecated** set(data)
> **이 메서드는 livedata 1.1.0 이후로 지원이 중단됩니다.**  
> **setter new LiveData().value를 대신 이용하십시오.**  
> **data**를 **설정**하는 메서드입니다.  
> **새로운 data**가 **이전 data**와 다르고, **observer**가 **함수**일 경우 **observer**를 호출합니다.  
예시:
```js
const db = new LiveData({name: "hynrusang", isVerify: false}).registObserver(function () { console.log(this.get()); });  
db.set({name: "hynrusang", isVerify: true});  

// console
{name: 'hynrusang', isVerify: true}
```
---
#### 1-4. **@1.0.0** **@deprecated** get()  
> **이 메서드는 livedata 1.1.0 이후로 지원이 중단됩니다.**  
> **getter new LiveData().value를 대신 이용하십시오.**  
> **현재 data**를 반환하는 메서드입니다.  
예시:
```js
console.log(db.get())

// console
{name: 'hynrusang', isVerify: true}
```
---
### 2. prototype
#### 1. **@1.0.0** JSON.unlivedata(json)   
> **JSON.unlivedata**는 **JSON 객체**를 처리하여 **LiveData**를 **포함하지 않도록** 변환하는 매서드입니다.  
> **(실제 json의 data는 달라지지 않습니다.)**  
> 이 매서드는 다음과 같은 작업을 수행합니다:  
1. 빈 **json 객체**인 **data**를 생성합니다.  
2. 주어진 **json 객체**의 **키**를 순회하면서 각 키에 대한 **값**을 처리합니다.  
- 만약 해당 키의 **값**이 **LiveData 인스턴스**인 경우, **LiveData**의 **get()** 을 호출하여 data에 저장합니다.  
- **그렇지 않은 경우**, 해당 키의 **값**을 **그대로** data에 저장합니다.  
3. 처리가 완료된 **data**를 반환합니다.  
예시:  
```js
const resource = {
    name: new LiveData("hynrusang"),
    id: new LiveData(32).registObserver(() => { console.log("data changed") })
}
JSON.unlivedata(resource)

// return 
{name: 'hynrusang', id: 32}
```
---
#### 2. **@1.0.0** Array.unlivedata(array)
> **Array.unlivedata**는 **Array**을 처리하여 **LiveData**를 **포함하지 않도록** 변환하는 매서드입니다.  
> **(실제 array의 data는 달라지지 않습니다.)**  
> 이 매서드는 다음과 같은 작업을 수행합니다:  
1. 빈 **Array**인 **data**를 생성합니다.  
2. 주어진 **Array**을 **순회**하면서 각 **값**을 수행합니다.  
- 만약 해당 **값**이 **LiveData 인스턴스**인 경우, **LiveData**의 **get()** 을 호출하여 data에 추가합니다.    
- **그렇지 않은 경우**, 해당 **값**을 **그대로** data에 추가합니다.  
3. 처리가 완료된 **data**를 반환합니다.  
예시:
```js
const data = [new LiveData(3), new LiveData("some string").registObserver(() => {
    console.log("changed!");
})]
Array.unlivedata(data)

// return
[3, 'some string']
```
---
## 업데이트 내역
> 1.0.0  
> create class LiveData;  
>
> create JSON.unlivedata(json) : Object;  
> create Array.unlivedata(array) : Array;  
>
> @deprecated LiveData.set()
> @deprecated LiveData.get()

# ![JavaScript icon](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/33px-Unofficial_JavaScript_logo_2.svg.png) LiveData (in kotlin)
- [이전으로](https://github.com/hynrusang/js-lib)
- [소스코드](https://github.com/hynrusang/js-lib/blob/main/1.0.0/livedata.js)
---

## 정보
- 이건 **kotlin**에 있는 **LiveData**를 구현한 js 파일 입니다.  
- (사용방법은 아래의 요소 탭을 참고하세요.)

## 요소
### 1. LiveData: Class
> **LiveData**는 **데이터를 관리**하고, 값이 변경되면 **observer**를 통해 알려주는 **클래스**입니다..  
> LiveData 클래스 안에는, 다음과 같은 요소들이 있습니다.   
> 1. constructor(data): LiveData 클래스의 생성자입니다.  
> **data**는 초기 데이터로 설정됩니다.  
> **(아직은 3, 5.6 같은 Number나 "test" 등의 String, [2, 3]같은 Array 또는 {data: true} 등의 객체 리터럴만 지원합니다.)**
> 2. set(data)  
> **data**를 **설정**하는 메서드입니다.  
> **새로운 data**가 **이전 data**와 다르고, **observer**가 **함수**일 경우 **observer**를 호출합니다.  
> 3. get()  
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
db.observer = function () { console.log(this.get()); }
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
#### 1-2. set(data)
> **data**를 **설정**하는 메서드입니다.  
> **새로운 data**가 **이전 data**와 다르고, **observer**가 **함수**일 경우 **observer**를 호출합니다.  
예시:
```js
const db = new LiveData("data");  
db.observer = function () { console.log(this.get()); }  
db.set("data renew");  

// console
data renew
```
---
#### 1-3. get()
> **현재 data**를 반환하는 메서드입니다.  
예시:
```js
console.log(db.get())

// console
data renew
```
---
## 업데이트 내역
> 1.0.0  
> create class LiveData;  

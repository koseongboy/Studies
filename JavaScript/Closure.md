# 클로저

## 1. 렉시컬 스코프

함수를 어디서 호출했는 지가 아니라 어디에서 정의했는 지에 따라 상위 스코프를 결정하는 것.

## 2. [[Environment]] 내부 슬롯

함수는 자신의 내부 슬롯 [[Environment]]에 상의 스코프의 참조를 저장한다.

## 3. 클로저와 렉시컬 환경

```javascript
const x = 1;

function outer() {
  const x = 10;
  const inner = function () {
    console.log(x);
  };
  return inner;
}

const innerFunc = outer();
innerFunc(); // 10
```
outer 함수는 inner 함수를 반환하고 실행 컨텍스트에서 제거된다. 이때 outer 함수의 지역변수 x(10)도 생명주기를 마감한다. 그러나 innerFunc()의 실행 결과는 10이다.  

이처럼 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저라고 부른다.

inner 함수의 [[Environment]] 내부슬롯이 outer를 참조하고 있으므로 실행 컨텍스트는 제거되지만 렉시컬 환경은 제거되지 않는다. 따라서 outer의 x를 innerFunc가 참조할 수 있는 것이다.  

자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수를 클로저라 부를 수는 있지만 일반적으로 그러진 않는다. (상위 스코프의 식별자를 참조하고, 외부 함수보다 생명 주기가 긴 내부 함수만이 클로저) 이때 상위 스코프의 식별자(변수)를 자유 변수라고 부른다.

## 4.클로저의 활용

상태를 안전하게 변경하고, 유지하기 위해 사용한다. (자바에서 private 변수에 대한 setter함수와 비슷한 용도?)

```javascript
const increase = (function () {
  let num = 0;
  return function () {
    return ++num;
  };
}());

console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3
```
생성자 함수로 표현
```javascript
const Counter = (function () {
  let num = 0;

  function Counter() {

  }

  Counter.prototype.increase = function() {
    return ++num;
  };

  Counter.prototype.decrease = function() {
    return num > 0 ? --num : 0;
  };

  return Counter;
}());
```
즉시 실행 함수 내에서 또 다른 Counter를 선언하여 반환한 것이므로 외부에서 num 변수에 접근할 수 있는 방법은 없다. 따라서 은닉되었고 increase, decrease를 상속받는 인스턴스를 생성하여 사용하기 때문에 특정 함수에만 수정을 허용하고 있다.

## 5. 캡휼화와 정보 은닉

자바스크립트는 접근 제한자를 제공하지 않기 때문에 생성자를 반환하는 즉시실행함수의 지역변수로 private를 구현한다. 하지만 이렇게 만든 생성자 함수를 통해 인스턴스를 두 개 이상 만들 경우 은닉한 변수를 여러 인스턴스가 공유하게 된다. (선언 당시 스코프 때문에)





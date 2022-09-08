# 심볼

## 1. 심볼이란?

변경 불가능한 원시 타입, 다른 값과 중복되지 않는 유일무이한 값.

## 2. 심볼의 생성

### 1. Symbol() 함수 사용, (생성자 함수가 아님에 주의)

```javascript
const mySymbol = Symbol();
```

Symbol 함수에 다른 래퍼 객체의 생성자 함수처럼 값을 전달하면 암묵적으로 Symbol도 래퍼 객체를 생성한다.  
심볼 값은 숫자나 문자 등으로는 암묵적 타입변환이 일어나지 않지만 불리언 타입으론 암묵적으로 변환된다.

### 2. Symbol.for()/Symbol.keyFor() 메소드

1. Symbol.for(): 인수로 전달된 값을 키로 가지는 심볼을 생성한다.

2. Symbol.keyFor(): 인수로 전달된 심볼의 키를 반환한다.

## 3. 심볼과 상수

열거형과 같이 변수의 값보다는 이름이 중요한 경우가 있는데 이때 임의의 상수 값을 넣어서 사용하다보면 값이 중복되거나 변형될 수 있다. 이때 상수 대신 심볼을 사용 가능하다.

## 4. 심볼과 프로퍼티 키

객체의 프로퍼티 키에 심볼을 사용할 수 있고 동적으로 생성도 가능하다. 이때 키는 대괄호로 감싸줘야 한다.

```javascript
const obj = {
  [Symbol.for("hi")]: 1,
};
```

이때 키가 심볼인 프로퍼티는 for...in문이나 Object.keys 등으로 접근할 수가 없다. Object.getOwnPropertySymbols 메소드를 사용하면 찾을 수 있다.

표준 빌트인 객체에 사용자 정의 메소드 등을 추가하여 사용하는 것은 바람직하지 않다. 이름이 중복될 수 있기 때문이다. 이때 사용자 정의 메소드 프로퍼티를 심볼로 생성하면 중복을 피할 수 있다.

## 5. Well Known Symbol

자바스크립트가 기본적으로 제공하는 빌트인 심볼값

이터러블 관련 내용이 있는데 다음단원 보고 다시 공부해야할듯.
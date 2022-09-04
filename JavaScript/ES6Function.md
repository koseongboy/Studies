# ES6 함수의 추가 기능

## 1. 함수의 구분

ES6 이전에는 자바스크립트의 함수들은 별다른 구분 없이 다양한 목적으로 사용되었다. 따라서 ES6 이전의 모든 함수는 일반 함수로서 호출할 수 있고, 생성자 함수로서 호출할 수 있다. 허나 이러한 특징은 불필요한 프로토타입 객체를 생성하기도 하여 실수를 유발하고 성능에도 좋지 않다.  
따라서 이러한 문제를 해결하기 위해 ES6에서는 함수를 사용 목적에 따라 세 가지 종류로 구분했다.

1. 일반 함수
2. 메소드
3. 화살표 함수

## 2. 메소드

ES6 사양에서 메소드는 메소드 축약 표현으로 정의된함수만을 의미한다.

```javascript
const obj = {
  x: 1,
  foo() {
    return this.x;
  },
};

obj.foo.hasOwnProperty("prototype"); //false
```

표준 빌트인 객체가 제공하는 프로토타입 메소드와 정적 메소드는 모두 non-constreuctor다.

```javascript
String.prototype.toUpperCase.prototype; //undefined
Number.prototype.toFixed.portotype; //undefined
```

ES6 메소드는 자신을 바인딩한 객체를 가리키는 내부 슬롯인 [[HomeObject]]를 갖는다. super 참조는 내부슬롯 [[HomeObject]]를 사용하여 수퍼클래스의 메소드를 참조한다. 따라서 [[HomeObject]]를 가지는 ES6 메소드는 super 키워드를 사용할 수 있다.

## 3. 화살표 함수

### 1. 정의

함수 선언문으로 정의할 수 없고 함수 표현식으로 정의해야한다.

```javascript
const multiply = (x, y) => x * y;
```

매개변수가 한 개 인 경우 괄호 생략 가능(prettier가 자꾸 괄호 추가하는 걸 보면 괄호가 권장되는듯), 두 개 이상일 경우 괄호 안에 콤마를 기준으로, 없을 경우에는 괄호 생략 불가능.

```java
const arrow0 = () => {};
const arrow1 = x => {};
const arrow2 = (x, y) => {};
```

함수 몸체가 하나의 표현식으로 된 문으로 구성된다면 중괄호 생략 가능. 이때 그 문은 반환되므로 표현식이 아닌 문이라면 중괄호 생략 불가.

```javascript
const power = (x) => x ** 2;
//위 표현은 아래와 같음
const power = (x) => {
  return x ** 2;
};
```

만약 객체 리터럴을 반환하는 경우 소괄호로 감싸줘야한다. (중괄호가 중복되기 때문)

```javascript
const arrow = () => ({ id, content });
```

화살표 함수는 일급 객체이므로 인수로 전달 가능. 이때 가독성이 좋아진다.

```javascript
//ES5
[1, 2, 3].map(function (v) {
  return v * 2;
});
//ES6
[1, 2, 3].map((v) => v * 2);
```

### 2. 화살표 함수 vs 일반 함수

1.  화살표 함수는 non-constructor다. 따라서 prototype프로퍼티도 없다.
2.  중복된 매개변수 이름을 선언할 수 없다.
3.  화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.

    > > 화살표 함수의 this와 일반 함수의 this는 다르게 작동한다.  
    > > 일반 함수의 this(중첩함수, 콜백함수 포함): 기본적으로 전역 객체, strict mode에서는 undefined  
    > > 메소드의 this: 메소드를 호출한 객체에 바인딩
    > >
    > > ```javascript
    > > class Prefixer {
    > >   constructor(prefix) {
    > >     this.prefix = prefix;
    > >   }
    > >   add(arr) {
    > >     return arr.map(function (item) {
    > >       return this.prefix + item; //TypeError
    > >     });
    > >   }
    > > }
    > > const prefixer = new Prefixer("-webkit-");
    > > console.log(prefixer.add(["transition", "user-selet"]));
    > > ```
    > >
    > > 다음 예제는 TypeError를 발생시킨다. 그 이유는 위에 써있듯이 일반 함수의 this는 strict mode에서 undefined가 바인딩되기 때문 (클래스에서는 암묵적으로 strict mode 적용)  
    > > 위 예제의 해결법
    > >
    > > ```javascript
    > > class Prefixer {
    > >   constructor(prefix) {
    > >     this.prefix = prefix;
    > >   }
    > >   add(arr) {
    > >     const that = this; //this의 회피
    > >     return arr.map(function (item) {
    > >       return that.prefix + item;
    > >     });
    > >   }
    > > }
    > > ```
    > >
    > > Array.prototype.map 함수의 두 번째 인수에 this로 사용할 객체를 전달할 수 있다.
    > >
    > > ```javascript
    > > add(arr) {
    > >   return arr.map(function(item) {
    > >     return this.prefix + item;
    > >   }, this);
    > > }
    > > ```
    > >
    > > Function.prototype.bind 메소드를 활용해 this를 바인딩 시킬 수 있다.
    > >
    > > ```javascript
    > > add(arr) {
    > >   return arr.map(function(item) {
    > >     return this.prefix + item;
    > >   }.bind(this));
    > > }
    > > ```
    > >
    > > 화살표 함수는 자체적인 this바인딩을 가지지 않지만 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다. 이를 lexical this라 한다. 렉시컬 스코프와 같이 화살표 함수의 this가 정의된 위치에서 결정되기 때문이다.
    > >
    > > ```javascript
    > > add(arr) {
    > >   return arr.map(item => this.prefix + item);
    > > }
    > > ```
    > >
    > > 화살표 함수는 자체적인 this 바인딩이 없기 때문에 Function.prototype.call/apply/bind 메소드를 사용해도 함수 내부의 this를 교체할 수 없다.

4.  super: 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조한다.
5.  arguments: arguments도 마찬가지로 상위 스코프의 arguments를 참조한다. 따라서 매개변수의 개수를 확정할 수 없는 가변 인자 함수를 구현하려면 Rest 파라미터를 사용해야 한다.

## 4. Rest 파라미터

매개변수 이름 앞에 ...을 붙여서 정의한 매개변수. 전달된 인수들의 목록을 배열로 전달받는다.

```javascript
function foo(param, ...rest) {
  console.log(param); //'param'
  console.log(rest); //[1, 2, 3, 4, 5]
}

foo("param", 1, 2, 3, 4, 5);
```

Rest 파라미터는 마지막 파라미터여야 한다.  
arguments 객체는 유사 배열 객체여서 배열 메소드를 사용하려면 배열로 변환시켜줘야 했지만 Rest파라미터는 배열로 들어오기 때문에 변환할 필요가 없다.

## 5. 매개변수 기본값
자바와 동일.
```javascript
function sum(x = 0, y = 0) {
  return x + y;
}
console.log(sum(1, 2)); //3
console.log(sum(1)); //1
```
다만 Rest 파라미터에는 기본값을 지정할 수 없다.

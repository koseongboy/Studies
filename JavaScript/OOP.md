# JS의 객체지향

## 1. 객체란?

프로그램의 상태(property), 동작(method)을 하나의 논리적인 단위로 묶은 복합적인 자료구조

## 2. 상속

프로토타입 기반으로 상속 구현

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getArea = funcion () {
    //앞으로 생성하는 모든 객체에 getArea() function 복제
    return Math.PI * this.radius ** 2;
  };
}
```

모든 객체가 같은 함수를 복제, 공유하면 메모리 낭비. 따라서 상속을 통해 중복을 해결 (부모로 메소드 전달)  
JS에서 상속은 프로토타입으로 구현

```javascript
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getArea = function () {
  return Math.PI * radius ** 2;
};
```

## 3. 프로토타입 객체

모든 객체는 [[prototype]] 내부 슬롯을 가진다. 참조하는 값은 객체 생성 방식에 따라 갈린다.

```javascript
생성자함수.prototype; //생성자 함수 -> prototype
prototype.constructor; //prototype -> 생성자 함수
객체.__proto__; //객체 -> prototype
```

`__proto__`프로퍼티는 객체가 직접 가지는 것이 아니라 Object가 가지고 있다. 따라서 객체로 hasOwnProperty("`__proto__`")를 호출하면 false가 나온다. (`__proto__`의 경우 상속받은 프로퍼티를 사용하는 느낌)

```javascript
console.log(person.hasOwnProperty("__proto__")); //false
console.log({}.__proto__ === Object.prototype); //true
```

`__proto__`의 존재 이유: 상호 참조를 기능적으로 막기 위해  
`__proto__`사용 주의점: Object를 상속받지 않거나 프로토타입 체인의 종점에 있는 경우 등 `__proto__`를 상속받지 않는 경우가 있다. 따라서 `Object.getPrototypeOf(객체) / Object.setPropertyOf(자식, 부모)`를 사용하는 편이 좋다.

### 함수 객체의 프로토타입

생성자 함수들은 prototype 프로퍼티를 가지고 이는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다. 따라서 인스턴스를 생성하지 않는 non-constructor 함수는 prototype 프로퍼티를 가지고있지 않는다.

## 4. 리터럴로 생성된 객체의 생성자 & 프로토타입

```javascript
const obj = {}; //객체 리터럴
const func = function () {}; //함수 리터럴
const arr = []; //배열 리터럴
//아래는 모두 true
console.log(obj.constructor === Object);
console.log(obj.__proto__ === Object.prototype);
console.log(func.constructor === Function);
console.log(func.__proto__ === Function.prototype);
console.log(arr.constructor === Array);
console.log(arr.__proto__ === Array.prototype);
```

## 5. 프로토타입의 생성 시점

프로토타입은 생성자 함수가 생성되는 시점에 같이 생성된다. => 코드 맨 위에서 생성

```javascript
console.log(Person.prototype); //출력 됨
function Person(name) {
  this.name = name;
}
```

빌트인 생성자 함수(Object, Function, Number 등)의 프로토타입도 마찬가지로 같이 생성되는데 이는 전역 객체가 생서될 때 생성된다

## 6. 프로토타입 체인

모든 프로토타입의 프로토타입은 Object.prototype이다.

생성자 함수의 프로토타입은 Function.prototype이고 Function.prototype의 프로토타입은 Object.prototype이다.  
마찬가지로 생성된 객체의 프로토타입은

1. 명시적으로 지정했을 경우: 객체.prototype이 되고 그것의 프로토타입이 Object.prototype가 된다.
2. 명시적으로 지정하지 않았을 경우: 바로 Object.prototype으로 연결된다.

따라서 생성자 함수든 생성자 함수로 생성된 객체든 프로토타입 체인의 최상단에는 항상 Object.prototype이 존재한다.

## 7. 오버라이딩 & 프로퍼티 섀도잉

자식 객체에 이름이 같은 메소드가 있으면 이를 오버라이딩이라 함. (자바와 동일) 이때 부모객체에 있던 원래 메소드는 프로토타입 메소드, 자식 객체가 오버라이딩한 메소드를 인스턴스 메소드라 한다. 오버라이딩에 의해 프로토타입 메소드가 인스턴스 메소드를 가리는 경우를 프로퍼티 섀도잉(shadowing)이라 한다.  
메소드를 삭제하는 경우에는 자식 객체의 메소드(인스턴스 메소드)부터 삭제된다. -> 이를 통해 알 수 있는 사실은 하위 객체를 통해 상위 객체로의 get 액세스는 허용되지만 set 액세스는 허용되지 않는다.

## 8. 프로토타입 교체

### 생성자 함수에 의한 프로토타입 교체

프로토타입 객체는 임의의 내가 만든 객체로 변경할 수 있다. 이때 임의로 교체한 객체에는 constructor 프로퍼티가 없으므로 교체한 자식 객체의 constructor를 검색하면 Object가 나온다.  
연결이 끊어진 원래 생성자와 다시 연결하는 방법은 다음과 같다.

```javascript
const Person = function (name) {
  this.name = name;
};

Person.prototype = {
  constructor: Person, //constructor 프로퍼티와 생성자 함수를 연결
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};
```

### 인스턴스에 의한 프로토타입 교체

`__proto__`접근자 프로퍼티를 이용해 교체 가능하다(Object.setPrototypeOf 메소드 사용 권장)

```javascript
const me = new Person("Ko");
const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

Object.setPrototypeOf(me, parent);
me.sayHello(); //Hi! My name is Ko
```

인스턴스에 의한 프로토타입 교체도 마찬가지로 기존 생성자 함수와의 연결이 끊어졌기 때문에 constructor 프로퍼티를 검색하면 Object가 나온다. 또한 인스턴스에서 프로토타입을 변경했기 때문에 생성자.prototype로 프로토타입에 접근하려하면 연결이 끊어져 접근할 수 가 없게 된다.

==> 프로토타입 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는 것은 꽤나 번거롭다. 따라서 프로토타입은 직접 교체하지 않는 것이 좋다.

## 9. instancof 연산자

```javascript
객체 instanceof 생성자 함수
```

우변의 생성자 함수의 prototype에 바인딩 된 객체(생성자함수.prototype)이 객체의 프로토타입 체인 상에 존재하면 true, 그렇지 않을 경우 false로 평가된다.  
따라서 프로토타입을 임의로 변경하면 객체를 생성할때 사용한 생성자 함수를 우변에 집어넣어도 false로 평가된다. 또한 생성자 함수에 의한 프로토타입 교체를 통해 constructor과의 연결이 끊어져도 프로토타입만 일치하면 true로 평가된다.

## 10. 직접 상속

### Object.create에 의한 직접상속

Object.create함수는 prototype를 명시적으로 지정하여 새로운 객체를 생성한다. 첫 번째 매개변수로는 프로토타입으로 지정할 객체, 두 번째 매개변수(선택)에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이루어진 객체를 전달한다.  
만약 첫 번째 매개변수로 null을 준다면 해당 객체는 Object.prototype조차 상속받지 못한다.

```javascript
let obj = Object.create(null); //Object.getPrototypeOf(ojb) === null

obj = Object.create(Object.prototype); //<=> obj = {};

obj = Object.create(Object.prototype, {
  //<=> obj = { x: 1 };
  x: { value: 1, writable: true, enumerable: true, configurable: true },
});
```

### 리터럴 내부에 `__proto__` 명시

객체를 리터럴로 생성할 때 직접 명시할 수 있다

```javascript
const myProto = { x: 10 };

const obj = {
  y: 10,
  __proto__: myProto,
  //Object.getPrototypeOf(obj) === myProto
};
```

## 11. 정적 프로퍼티/메소드

인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메소드 (자바와 동일)

```javascript
function Person(name) {
  this.name = name;
}

//프로토타입 메소드
Person.prototype.sayHello = function () {
  console.log("blabla");
};

//정적 프로퍼티
Person.staticProp = "im static";

//정적 메소드
Person.staticMethod = function () {
  console.log("im static too");
};

const me = new Person("ko");

me.staticMethod(); //에러
```

위 코드에서 마지막 라인이 오류를 발생시키는 이유는 정적 프로퍼티/메소드는 프로토타입 체인 상에 존재하는 것이 아니라 생성자 함수에 존재하는 것이기 때문에 인스턴스로 접근할 수는 없다.

## 12. 프로퍼티 존재 확인

1. key in object -> 프로토타입 체인 내에서 해당 프로퍼티가 존재하는 지 검사한다
2. Reflect.has(object, key) -> in 연산자와 동일
3. 객체.hasOwnProperty(key) -> 상속과 관계없이 객체 고유의 프로퍼티만 검사

## 13. 프로퍼티 열거

예시만 봐도 대충 이해 가능 (파이썬 for문, 자바 for each 문과 비슷)

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
};

for (const key in person) {
  console.log(key + ": " + person[key]);
}
```

다만 기억해야할 사항: 상속받은 모든 프로퍼티를 열거, 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false인 항목은 건너뛴다. (그래서 프로퍼티 열거인듯)  
배열의 경우에는 for in문 대신

```javascript
const arr = [1, 2, 3];
//1
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
//2
arr.forEach((v) => console.log(v));
//3
for (const value of arr) {
  console.log(value);
}
```

위 세 가지 방법을 권장한다.

상속받은 프로퍼티를 제외하고 객체 자신의 고유 프로퍼티만을 열거하기 위해서는

```javascript
const person = {
  name: "Ko",
  address: "deokso",
  __proto__: { age: 20 },
};

console.log(Object.keys(person)); //["name", "address"]
console.log(Object.values(person)); //["Ko", "deokso"]
console.log(Object.entires(person)); //[["name", "Ko"], ["address", "deokso"]]
Object.entires(person).forEach(([key, value]) => console.log(key, value));
```

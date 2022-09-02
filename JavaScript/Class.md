# 클래스

## 1. 클래스 정의

```javascript
//기본
class Person {}
//익명 클래스 표현식
const Person = class {};
//기명 클래스 표현식
const Person = class MyClass {};
```

표현식으로 정의할 수 있다 => 일급 객체다 (값으로 사용 가능하다)

클래스의 몸체에는 메서드만 정의할 수 있다. constructor, 프로토타입 메소드, 정적 메소드 이 세 가지를 정의할 수 있다.

```javascript
class Person {
  //constructor
  constructor(name) {
    this.name = name;
  }
  //프로토타입 메소드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
  //정적 메소드
  static sayHello() {
    console.log("Hello!");
  }
}

const me = new Person("Ko");

console.log(me.name); //Ko
me.sayHi(); //Hi! My name is Ko
Person.sayHello(); //Hello!
```

생성자 함수와의 비교

```javascript
var Person = (function () {
  //constructor
  function Person(name) {
    this.name = name;
  }
  //프로토타입 메소드
  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}`);
  };
  //정적 메소드
  Person.sayHello = function () {
    console.log("Hello!");
  };
  //생성자 함수 반환
  return Person;
  //즉시실행
})();
```

## 2. 클래스 호이스팅

클래스는 함수로 평가된다. 따라서 함수와 같이 호이스팅이 작동하지만 그렇지 않은 것 처럼 선언 전에는 참조가 불가능하다.

## 3. 인스턴스 생성

자바/생성자 함수와 같이 작동

## 4. 메소드

### 1. constructor

constructor에 return문을 작성하면 이를 무시하고 this가 반환된다.

### 2. 프로토타입 메소드

생성자 함수를 이용할 때는 프로토타입 메소드를 생성할 때 명시적으로 프로토타입에 메소드를 추가해야한다.

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log("blabla");
};
```

하지만 클래스를 사용할 떄는 명시적으로 추가할 필요가 없다

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  //프로토타입 메소드
  sayHi() {
    console.log("blabla");
  }
}
```

### 3. 정적 메소드

정적 메소드도 마찬가지로 생성자 함수에서는 명시적으로 표시를 해줘야 했지만 클래스에서는 그럴 필요가 없다.

```javascript
function Person(name) {
  this.name = name;
}
Person.sayHi = function () {
  console.log("Hi!");
};
```

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  static sayHi() {
    console.log("Hi!");
  }
}
```

정적 메소드는 인스턴스로 호출할 수 없다(자바와 동일).

### 4. 전체적인 특징

1. function 키워드를 생략
2. 메소드 정의 후에 콤마가 필요하지 않음
3. 암묵적으로 strict mode로 실행됨(해제 불가)
4. for...in문, Object.keys메소드 등으로 열거 불가. [[Enumerable]]의 값이 false
5. non-constructor임

## 5. 프로퍼티

일반적인 프로퍼티는 constructor 내부에서 this 바인딩을 통해 초기화한다.

### 접근자 프로퍼티

getter 함수와 setter 함수는 생성자 함수에서 만들었던 것과 마찬가지로 메소드 이름 앞에 get, set을 붙여서 만든다.

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastNmae = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
}
```

최신 버전의 환경에서는 다른 언어(자바)처럼 필드 선언하듯이 클래스 내부에 프로퍼티를 선언할 수 있다.(원래는 메소드만 가능)

```javascript
class Person {
  name = "Ko";
}
```

이때 프로퍼티에 함수를 할당하면 프로토타입 메소드가 아닌 인스턴스 메소드가 된다.

```javascript
class Person {
  name = function () {
    console.log("blabla");
  };
}
```

### private 필드 정의 제안

자바스크립트는 캡슐화를 완전히 지원하지 않는다.(모든 인스턴스 프로퍼티는 public이다.)  
선언 방법은 필드의 선두에 #을 붙여주는 것ㄷㅇ디다.
```javascript
class Person {
  #name = '';

  constructor(name) {
    this.#name = name;
  }
}

const me = new Person('Ko');
console.log(me.#name); //SyntaxError
```
이러한 private 프로퍼티는 접근자 프로퍼티로 접근하게 하면 된다(getter, setter)

### static 필드 정의 제안
static 키워드도 마찬가지로 제안되어 이미 구현되어있다. 필드 앞에 #을 붙여주던 private과 달리 이미 static 키워드가 구현되어있으므로 필드 앞에 static 키워드를 붙이면 된다.

## 6. 상속

자바와 같이 자바스크립트의 클래스는 상속을 할 때 extends키워드를 사용하고 사용한 결과도 자바와 비슷하다. 다만 추가되는 개념은 프로토타입 체인도 상속 관계에 따라 복잡해진다는 것이다. 게다가 extends 키워드 뒤에 클래스 뿐 아니라 생성자 함수도 추가해 생성자 함수를 상속받을 수도 있다. 

### super키워드

super(): 부모 객체의 생성자를 호출한다. 자바와 비슷하게 작동한다.
```javascript
class Parent {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  class Child extends Parent {
    constructor(a, b, c) {
      super(a, b);
      this.c = c;
    }
  }
}
```

super: 상위 객체를 참조하여 메소드를 호출할 수 있다. 자바와 비슷하게 작동한다. 자바와 다른 점은 프로토타입 체인 내에서 상위 객체의 메소드를 호출한다는 점이다. 근데 정적 메소드도 가져온다.(?)   
모든 서브클래스들은 constructor 내부에 super 호출이 있어야 한다. 그 이유는 서브클래스의 인스턴스를 생성할 경우 맨 처음 수퍼클래스에게 인스턴스 생성을 위임하기 때문이다. 
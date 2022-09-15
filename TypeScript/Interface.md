# 인터페이스

타입스크립트의 인터페이스는 다른 언어에 비해 정의할 수 있는게 많다.

## 1. 객체의 타입 정의

```typescript
interface Person {
  name: string;
  age?: number; //선택 속성
  readonly height; //재할당 불가
  [asd: string]: string | number; //속성 이름이 문자열인 모든 값, 선택 속성이랑 공존 불가
}
```

속성 이름에 타입을 정의했을 때 이는 내부적으로 문자열로 변환해서 사용한다  
-> 속성 이름의 타입이 문자열인 속성에 할당 가능해야함

```typescript
interface Asd {
  [key: number]: number;
  [key: string]: string | number; //key: number의 값이 할당 가능해야함
  [key: string]: string; //에러
}
```

인터페이스로 함수 타입 정의 가능

```typescript
interface GetText {
  (name: string, age: number): string;
}
//<=>
type GetText = (name: string, age: number) => string;

const getText: GetText = function (name, age) {};
```

인터페이스 구현

```typescript
interface Person {
  name: string;
  age: number;
  isYoungerThan(age: number): boolean;
}

class SomePerson implements Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  isYoungerThan(age: number) {
    return this.age < age;
  }
}
```

인터페이스 확장(상속)

```typescript
interface Person {
  name: string;
  age: number;
}

interface Programmer {
  favoriteProgrammingLanguage: string;
}

interface Korean extends Person, Programmer {
  isLiveInSeoul: boolean;
}
```

교차 타입을 통해 인터페이스를 합칠 수 있음.

```typescript
interface Person {
  name: string;
  age: number;
}
interface Product {
  name: string;
  price: number;
}
type PP = Person & Product;
const pp: PP = {
  name: "a",
  age: 23,
  price: 1000,
};
```

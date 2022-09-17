# 맵드 타입

객체 타입 생성 이라 생각하면 될듯

```typescript
type T1 = { [K in "prop1" | "prop2"]: boolean };
//<=>
type T1 = {
  prop1: boolean;
  prop2: boolean;
};
```

입력된 인터페이스의 모든 속성을 boolean으로

```typescript
interface Person {
  name: stirng;
  age: number;
}

type MakeBoolean<T> = { [P in keyof T]?: booldan };
const pMap: MakeBoolean<Person> = {};
pMap.name = true;
pMap.age = false;
```

more 활용 (빌트인으로 지원하지만 따로 구현 실습)

```typescript
interface Person {
  name: string;
  age: number;
}

type T1 = Person["name"]; //type T1 = string;
type Readonly<T> = { readonly [P in keyof T]: T[P] }; //모든 속성 readonly로
type Partial<T> = { [P in keyof T]?: T[P] }; //모든 속성 선택 속성으로
```

```typescript
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
interface Person {
  name: string;
  age: number;
  language: string;
}
type T1 = Pick<Person, 'name' | 'language'>;
//<=>
interface T1 = {
  name: string;
  language: string;
}
```

```typescript
interface Person {
  name: string;
  age: number;
  language: string;
}
type Record<K extends string, T> = { [P in K]: T };
type T1 = Record<'p1' | 'p2', Person>;
//<=>
interface T1 = {
  p1: Person;
  p2: Person;
}
```

mapped type는 enum의 활용도를 올릴 수 있음.

```typescript
enum Fruit {
  Apple,
  Banana,
  Orange,
}
const FRUIT_PRICE: { [key in Fruit]: number } = {
  [Fruit.Apple]: 1000,
  [Fruit.Banana]: 1500,
  //오랜지 없어서 에러 생김
};
```

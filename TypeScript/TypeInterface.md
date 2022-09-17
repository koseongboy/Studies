# 타입 추론

타입을 명시하지 않아도 타입을 추론해줌.

const는 엄격히, let은 융통성있게 타입을 추론함

인터페이스: 인터페이스들을 이용해 배열을 만들면 할당이 가능한 변수들은 제거가 됨

```typescript
interface Person {
  name: string;
  age: number;
}
interface Korean extends Person {
  liveInSeoul: boolean;
}
interface Japanese extends Person {
  liveInTokyo: boolean;
}

const p1: Person = { name: "mike", age: 23 };
const p2: Korean = { name: "mike", age: 25, liveInSeoul: true };
const p3: Japanese = { name: "mike", age: 27, liveInTokyo: false };
const arr1 = [p1, p2, p3]; //typeof arr1 = Person[] (Korean과 Japanese가 Person에 할당 가능하기 때문에)
const arr2 = [p2, p3]; //typeof arr2 = (Korean | Japanese)[]
```



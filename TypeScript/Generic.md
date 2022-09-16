# 제네릭

자바와 거의 동일  
함수 오버로딩 문제 해결

extends를 이용해 제한 범위 설정 가능. (뒤에 오는 타입에 할당 가능한 T)

```typescript
function identify<T extends number | string>(p1: T): T {
  return p1;
}
```

keyof 키워드

```typescript
interface Person {
  name: string;
  age: number;
}
type T1 = keyof Person; //"name" | "age"
```


# 조건부 타입

기본 형태

```typescript
type T1 = T extends string ? X : Y;
```

T가 string에 할당 가능하다면? X, 아니라면? Y

```typescript
type IsStringType<T> = T extends string ? "yes" : "no";
type T1 = IsStringType<string>; // type T1 = 'yes';
type T2 = IsStringType<string | number>;
//T에 유니온 타입을 주면 아래와 같이 번역됨
type T2 = IsStringType<string> | IsStringType<number>;
// =>
type T2 = "yes" | "no";
```

활용 예 (빌트인)

```typescript
type T1 = number | string | never; //<=> type T1 = number | stirng; (never 타입은 삭제되는 타입)
type Exclude<T, U> = T extends U ? never : T; //U에 할당가능한 타입은 제거
type T2 = Exclude<1 | 3 | 5 | 7, 1 | 5 | 9>; //Type T2 = 3 | 7
type T3 = Exclude<string | number | (() => void), Function>;
type Extract<T, U> = T extends U ? T : never;
```

infer 뒤에 오는건 변수 처럼 사용할 수 있다. (? 뒤에 다시 똑같은 타입을 재사용하기 위해)

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

```typescript
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;
type T0 = Unpacked<string>; // string
type T1 = Unpacked<string[]>; // string
type T2 = Unpacked<Promise<string>[]>; //Promise<string>
type T3 = Unpakced<Unpacked<Promise<string>[]>>; //string
```

유틸리티 타입

```typescript
type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T]; //속성 값이 string에 할당 가능하면 key와 value가 같은 속성을 생성하고 아니면 삭제한다.  /  그 뒤 해당 속성 이름과 같은 리터럴 타입을 유니온 타입으로 반환한다.(Person['name']과 같은 이치)
interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1 = StringPropertyNames<Person>; // type T1 = 'name' | 'nation';

type StringProperties<T> = Pick<T, StringPropertyNames<T>>;
type T2 = StringProperties<Person>; //type T1 = { name: string; nation: string; }
```

```typescript
type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1 = Omit<Person, "nation" | "age">; // type T1 = { name: string; } (선택한 속성 제외한 새로운 타입)
```

```typescript
type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U; //U로 입력한 인터페이스로 T에 덮어씌우기 (똑같은 이름일 경우 U의 속성으로 됨)
interface Person {
  name: string;
  age: number;
}
type T1 = Overwrite<Person, { age: string; nation: string }>; // type T1 = {name: string; age: string; nation: string; }
```

# 타입

가장 기본적으로는 타입 스크립트가 타입을 추론하도록 해주는 것이 좋음. 명시적 타입을 지양.

```typescript
const size: number = 123;
const isBig: boolean = size >= 100;
const msg: string = isBig ? "크다" : "작다";
const udf: undefined = undefined;
const nul: null = null;
const any: any = 123; //모든 타입 가능
const v: object = { a: "a" };

const values: number[] = [1, 2, 3];
const values2: Array<number> = [1, 2, 3];
//Tuple
const data: [string, number] = [msg, size];

//리터럴도 타입으로 정할 수 있음
let v1: 10 | 20 | 30;
v1 = 10;
v1 = 15; //에러

function f1(): void {}
function f2(): never {} //항상 예외가 발생해 비정상적으로 종료되거나 무한루프 때문에 종료되지 않는 함수의 반환값 (거의 사용하지 않음)

//union타입, intersection타입
let v1: (1 | 3 | 5) & (3 | 5 | 7); //3이나 5만 가능

type Width = number | string; //타입에 별칭을 줄 수 있다.

let a: unknown; //타입이 unknown인 변수를 활용하려면 그 전에 타입을 확인하는 작업을 거쳐야함.
if (typeof a === "number") {
  let b = a + 1;
}
```

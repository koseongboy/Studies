# 함수 선언

```typescript
//선언문: 변수 뒤에 각각 타입, 소괄호 뒤에 반환타입
function getText(name: string, age: number): string {}

//화살표함수
const getText: (name: string, age: number) => string = function (name, age) {};

//변수 뒤에 물음표 붙여서 선택 매개변수로 사용 가능, 타입 뒤에 기본값 지정 가능
function getText(name: string, language?: string, age: number = 15): string {}

//rest 파라미터
function getText(name: string, ...rest: nubmer[]): string {}

//this 타입 정의: 첫 매개변수로 this의 타입을 정할 수 있음
function getParam(this: string, index: number): string {}

//함수 오버로딩
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: number | string, y: number | string): number | string {
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  } else {
    const result = Number(x) + Number(y);
    return result.toString();
  }
}

//네임드 파라미터: 매개변수로 오브젝트 전달
function getText({
  name,
  age = 15,
  language,
}: {
  name: string;
  age?: number;
  language?: string;
}): string {}

//네임드 파라미터의 타입 정보를 인터페이스로 저장해놓을 수 있음
interface Param {
  name: string;
  age?: number;
  language?: string;
}

function getText({name, age = 15, language}: Param): string { }
```

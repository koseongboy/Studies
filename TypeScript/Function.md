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
```

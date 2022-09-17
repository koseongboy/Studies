# 타입 가드

개발자가 변수의 타입을 확실하다고 할 때 강제로 타입을 주입하여 해당 타입이 사용 가능한 빌트인 메소드를 사용할 수 있다. (as 키워드 이용)

```typescript
function print(value: number | string) {
  if (typeof value === "number") {
    console.log((value as number).toFixed(2));
  } else {
    console.log((value as string).trim());
  }
}
```

그러나 as키워드를 남용하면 코드가 수정되었을 때 버그를 초래하기 쉽다. 따라서 타입스크립트에서는 타입 가드를 통해 자동으로 타입을 인식해줄 수 있다. (if문 안의 변수의 특수한 타입을 감지)

```typescript
function print(value: number | string) {
  if (typeof value === "number") {
    console.log(value.toFixed(2)); // typeof value = number;
  } else {
    console.log(value.trim()); // typeof value = string;
  }
}
```

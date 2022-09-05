# Number 빌트인 객체

## 1. Number 생성자 함수

Number 생성자 함수로 객체를 생성하면 [[NumberData]]내부슬롯에 해당 값(미입력 시 0)을 할당한 래퍼 객체를 생성한다. (ES5에서는 [[PrimitiveValue]]) 만약 다른 값을 전달하면 [[NumberData]]내부슬롯에 해당 값을 숫자로 강제 변환하여 할당한다. 변환할 수 없다면 NaN을 할당한다.

## 2. Number 프로퍼티

1. Number.EPSILON: 매우 작은 숫자라 생각하면 될듯. (1과 1보다 큰 가장 작은 숫자의 차) 약 2e-16이다. 부동 소수점을 비교할 때 이용

```javascript
function isEqual(a, b) {
  return Math.abs(a - b) < Number.EPSION;
}
```

2. Number.MAX_VALUE: 자바스크립트에서 표현할 수 있는 가장 큰 양수값. 약 e+308이다.

3. Number.MIN_VALUE: 자바스크립트에서 표현할 수 있는 가장 작은 양수값. 약 5e-324이다.

4. Number.MIN_SAFE_INTEGER: 자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수값이다.(음수)

5. Number.POSITIVE_INFINITY: 양의 무한대를 나타내는 숫자값 Infinity와 같다.

6. Number.NEGATIVE_INFINITY: 음의 무한대를 나타내는 숫자값 -Infinity와 같다.

7. Number.NaN: window.NaN과 같다.

## 3. Number 메소드

1. Number.isFinite: Infinity 혹은 -Infinity가 아닌 지 검사하여 그 결과를 불리언 값으로 반환한다. 만약 인수가 NaN이면 false를 반환한다.

2. Number.isInteger: 정수인 지 판별, 암묵적 타입 변환x

3. Number.isNaN: NaN인 지 판별. 암묵적 타입 변환x (undefined 등을 집어넣어도 false)

4. Number.isSafeInteger: 안전한 정수(-(2^53 - 1) ~ 2^53 - 1 사이의 정수값)인 지 판별. 암묵적 타입 변환 x.

5. Number.prototype.toExponential(n = 1): 앞에 있는 숫자를 과학적 기수법으로 표기, n은 표현할 유효숫자의 갯수 + 1

6. Number.prototype.toFixed(n = 0): 숫자를 반올림하여 문자열로 반환한다. 인수는 소숫점 아래 n자리만큼 유효하고 나머지를 반올림한다. 기본값 0

7. Number.prototype.toPrecision(n = 0): 앞의 숫자 만큼의 유효 숫자를 남기고 나머지는 반올림하여 문자열로 반환.

8. Number.prototype.toString(n = 10): 숫자를 n진법의 문자열로 반환한다.

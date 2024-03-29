# Strict Mode

## 1. strict mode란?

자바스크립트에서는 오류를 발생시키지 않고 암묵적으로 넘어가는 경우가 너무 많다. 그래서 자바스크립트의 문법을 조금 더 엄격하게 적용시켜 오류를 발생시켜 모르고 넘어갈 수 있는 논리적 오류에 대처할 수 있게 해준다.

## 2. strict mode 사용

전역의 선두 혹은 함수 몸체 선두에 'use strict';를 추가한다.  
전역에 strict mode를 사용하는 것은 바람직 하지 않다. 외부 라이브러리를 사용할 때 해당 라이브러리가 non-strict mode일 수도 있기 때문이다. 따라서 내 코드를 즉시 실행 함수로 묶고 strict mode를 사용하는 방법도 있다.  
또한 함수 단위로 strict mode를 지정하는 것도 바람직 하지 않다. 일관되지 않게 어떤 것은 strict, 어떤 것은 non-strict mode이거나 일일히 strict mode를 지정하는 것도 번거로운 일이다.

## 3. strict mode가 잡는 에러

1. 암묵적 전역: 선언하지 않은 변수 참조
2. delete 연산자로 변수, 함수, 매개변수 삭제
3. 매개변수 이름의 중복
4. with문 사용

## 4. strict mode를 사용했을 때 변화

1. 일반 함수의 this: strict mode를 사용했을 때 생성자 함수가 아닌 일반 함수에서 this를 호출하면 undefined가 바인딩된다.
2. 함수의 매개변수를 재할당 해서 변경해도 arguments객체에서는 변경 전 매개변수가 출력된다

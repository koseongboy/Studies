# 스프레드 문법

이터러블에 한정되어 사용할 수 있다.

스프레드 문법의 결과는 변수에 할당할 수 없다.(연산의 결과가 값이 아니라 목록이기 때문)

## 1. 함수 호출의 인수 목록에서 사용하는 경우

인수로 전달

```javascript
const arr = [1, 2, 3];

Math.max(arr); //NaN
Math.max(...arr); //3
```

인수로 사용

```javascript
function foo(...rest) {
  console.log(rest);
}

foo(...[1, 2, 3]);
```

## 2. 배열 리터럴 내부에서 사용하는 경우

1. concat

```javascript
const arr = [1, 2].conscat([3, 4]);

// =
const arr = [...[1, 2], ...[3, 4]];
```

2. splice

```javascript
const arr1 = [1, 4];
const arr2 = [2, 3];
const arr3 = [1, 4];

arr1.splice(1, 0, arr2); // -> [1, [2, 3,], 4]

arr3.splice(1, 0, ...arr2); // -> [1, 2, 3, 4]
```

3. 배열 복사

```javascript
const origin = [1, 2];
const copy1 = origin.slice();
const copy2 = [...origin];
```

4. 이터러블을 배열로 변환

```javascript
function sum() {
  return [...arguments].reduce((pre, cur) => pre + cur, 0);
}
```

5. 객체 리터럴 내부에서 사용하는 경우

프로퍼티 내부에서도 사용 가능하다.

```javascript
const obj = { x: 1, y: 2};
const copy = { ...obj };
```
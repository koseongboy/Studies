# 배열

## 1. 자바스크립트 배열은 배열이 아니다.

자료구조에서 말하는 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조를 말한다. 하지만 자바스크립트의 배열은 배열의 요소를 위한 각각의 메모리 공간이 동일한 크기를 갖지 않아도 되며 연속적으로 이어져 있지 않을 수도 있다.

## 2. 배열의 생성

일반적인 경우 건너뛰고 ES6에서 도입된 방법들만 정리

1. Array.of: 전달된 인수를 요소로 갖는 배열 생성

```javascript
Array.of(1); //[1]
Array.of(1, 2, 3); //[1, 2, 3]
```

2. Array.from: 유사 배열 객체, 이터러블 객체를 배열로 변환하여 반환한다.

```javascript
Array.from({ length: 2, 0: "a", 1: "b" }); //['a', 'b']
Array.from("Hello"); //['H', 'e', 'l', 'l', 'o']
```

Array.from의 두 번째 인수로 콜백함수를 받아 반환값으로 구성된 배열을 반환한다. 콜백 함수의 첫 인수는 배열의 값, 둘째 인수는 인덱스이다.

```javascript
Array.from({length: 3}. (value, index) => index); //[0, 1, 2]
```

## 3. 배열 요소 추가

객체에 배열의 요소를 동적으로 추가할 수 있다.

```javascript
const arr = [0];
arr[1] = 1;
console.log(arr); //[0, 1]
```

배열의 length프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열(중간이 비어있는 배열)이 된다.

## 4. 배열의 요소 삭제

```javascript
const arr = [1, 2, 3];

delete arr[1];
console.log(arr); //[1, empty, 3]
```

## 4. 배열 메소드

배열을 직접 변경하는 메소드, 새로운 배열을 생성하여 반환하는 메소드가 있음.

### 음수 배열 인덱싱: -1을 끝으로 시작해 -2, -3 ... 등등은 마지막에서 몇 번째 인덱스를 뜻함

1. Array.isArray: 전달된 인수가 배열이면 true, 아니면 false 반환 (유사 배열 객체도 안됨)

2. Array.prototype.indexOf: 배열의 요소를 검색하여 첫 번째로 검색된 요소의 인덱스를 반환, 없으면 -1 반환, 두 번째 인수로 검색을 시작할 인덱스를 넘길 수 있음.

3. Array.prototype.push: 인수로 전달받은 모든 값(여러 개 가능)을 배열의 마지막 요소로 추가하고 length 프로퍼티 값을 반환. 그러나 아래 방법이 더 빠름
   > ```javascript
   > const arr = [1, 2];
   > arr[arr.length] = 3; // [1, 2, 3]
   > ```
   >
   > 스프레드 문법도 사용 가능
   >
   > ```javascript
   > const arr = [1, 2];
   > const newArr = [...arr, 3]; //[1, 2, 3]
   > ```
4. Array.prototype.pop: 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다. push 메소드와 pop 메소드를 이용하여 스택을 쉽게 구현할 수 있다.

```javascript
class Stack {
  #array;

  constructor(array) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array.`);
    }
    this.#array = array;
  }
  push(value) {
    return this.#array.push(value);
  }
  pop() {
    return this.#array.pop();
  }
  entries() {
    return [...this.#array];
  }
}
```

5. Array.prototype.unshift: 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 length 프로퍼티를 반환한다. 이또한 스프레드 문법 사용 권장. push 앞부분버젼.

6. Array.prototype.shift: 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다. pop 앞부분 버젼. shift 와 push를 이용해 큐 구현 가능

```javascript
class Queue {
  #array;

  constructor(array) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array.`);
    }
    this.#array = array;
  }
  enqueue(value) {
    return this.#array.push(value);
  }
  dequeue() {
    return this.#array.shift();
  }
  entries() {
    return [...this.#array];
  }
}
```

7. Array.prototype.concat: 인수로 전달된 값들을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다. 인수로 전달한 값이 배열일 경우에도 가능하다. 원본 배열은 그대로다. 이 또한 스프레드 문법으로 대체 가능하다.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

let result = arr1.concat(arr2); //[1, 2, 3, 4]
result = arr1.concat(3); //[1, 2, 3]
result = arr1.concat(arr2, 5); //[1, 2, 3, 4, 5]
console.log(arr1); //[1, 2] (원본 배열은 변하지 않는다.)
```

8. Array.prototype.splice(start, deleteCount, ...items): 배열의 중간에 요소를 추가하거나 중간의 요소를 제거할 때 사용. start: 배열의 요소를 제거하기 시작할 인덱스. deleteCount: start 부터 몇 개를 제거할 지 넘김 (0도 가능, 옵션). items: 제거한 위치에 삽입할 요소들의 목록(옵션)

9. Array.prototype.slice(start = 0, end = this.length): 전달된 범위의 배열을 복사해 반환한다. 원본 배열은 변하지 않는다. start: 시작할 인덱스, end: 종료할 인덱스(해당 인덱스는 포함하지 않고 복사). 얕은 복사를 수행한다.

10. Array.prototype.join(separator = ','): 배열을 모두 separator로 이은 문자열로 반환. 원본 배열은 변하지 않음.

11. Array.prototype.reverse: 원본 배열의 순서를 뒤집는다. 원본도 바뀌고 바뀐 배열을 반환도 한다.

12. Array.prototype.fill(value, startIndex = 0, endIndex = this.length): startIndex부터 endIndex(endIndex는 미포함)까지 value로 배열을 채운다.

13. Array.prototype.includes(value, startIndex = 0): value가 startIndex부터 검색해서 있으면 true, 없으면 false를 반환한다.

14. Array.prototype.flat(depth = 1): 중첩 배열을 depth만큼의 깊이로 평탄화한다.(까뒤집는다)

```javascript
[1, [2, [3, [4]]]].flat(); //[1, 2, [3, [4]]]
[1, [2, [3, [4]]]].flat(Infinity); //[1, 2, 3, 4]
```

15. Array.from: 유사 배열 객체나 이터러블 객체를 전달하면 배열로 변환하여 반환한다.

## 5. 배열 고차 함수

1. Array.prototype.sort((a: number, b: number) => number): 원본 배열을 바꾼다. 기본적으로 배열을 오름차순으로 정렬한다. 콜백 함수의 반환값이 양수면 첫 째 인수(a)를 우선하여 정렬하고 0이면 정렬하지 않고, 0보다 크면 두 번째 인수를 우선하여 정렬한다.

2. Array.prototype.forEach((item, index, arr) => void, thisArg?): 원본 배열의 모든 요소를 순회하며 콜백함수를 반복 호출한다. 호출한 배열(this)를 순차적으로 전달한다. 콜백 함수의 매개변수로는 item(요소), index(인덱스), arr(원본 배열)이 전달된다. 그리고 두 번째 인수로 this로 사용할 객체를 전달한다. break, continue 등의 키워드는 사용할 수 없다.

3. Array.prototype.map((item, index, arr) => any, thisArg?): 콜백함수의 반환값들로 이루어진 새로운 배열을 반환한다. 이때 원본 배열은 변경되지 않는다.

4. Array.prototype.filter((item, index, arr) => value, thisArg?): 콜백함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다.

5. Array.prototype.reduce((previousValue, item, index, arr) => value, initalValue?): previousValue: 이전 콜백함수 반환값으로 모든 배열의 요소를 이용해 하나의 값을 산출할 때 사용한다. 그 하나의 값을 반환값으로 가지고 두 번째 인수로는 반환값의 초기 값을 설정할 수 있다. 초기값은 전달하는 것이 안전하다. (빈 배열일 때, 객체를 요소로 가지는 배열을 이용할 때 등등)

6. Array.prototype.some((item, index, arr) => any, thisArg?): 배열의 모든 요소를 순회하며 콜백함수의 반환값이 단 한번이라도 참이면 true, 모두 거짓이면 false를 반환한다.

7. Array.prototype.every((item, index, arr) => any, thisArg?): 배열의 모든 요소를 순회하면서 콜백함수의 반환값이 모두 참이면 true, 하나라도 거짓이면 false를 반환한다.

8. Array.prototype.find((item, index, arr) => any, thisArg?): 배열을 순회하며 콜백함수가 처음으로 true인 요소를 반환한다. 존재하지 않으면 undefined를 반환한다.

9. Array.prototype.findIndex((item, index, arr) => any, thisArg?): 배열을 순회하며 콜백함수가 처음으로 true인 인덱스를 반환한다. 존재하지 않는다면 -1을 반환한다.

10. Array.prototype.flatMap((item, index, arr) => any, thisArg?): map함수를 통해 나온 반환 배열을 평탄화까지 해준다.

# 이터러블

## 1. 이터레이션 프로토콜

순회 가능한 자료구조를 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙이다.

ES6에서는 순회가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 for ... of문, 스프레드 문법, 베열 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화했다.

이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있다.  
이터러블 프로토콜: Symbol.iterator를 프로퍼티 키로 사용한 메소드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 Symbol.iterator 메소드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.  
이터레이터 프로토콜: 이터러블의 Symbol.iterator 메소드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이터레이터는 next 메소드를 소유하며 next메소드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.

```javascript
const iterable = {
  [Symbol.iterator]() {
    //이터러블 프로토콜 준수
    let cur = 1;
    const max = 5;

    //이터레이터 반환
    return {
      next() {
        return { value: cur++, done: cur > max + 1 }; // 이터레이터 리절트 객체 (value: any, done: boolean)
      },
    };
  },
};
```

1. 이터러블: 이터러블 프로토콜을 준수한 객체를 이터러블이라 한다. 즉, 이터러블은 Symbol.iterator를 프로퍼티 키로 사용한 메소드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체.  
   이터러블인 지 구분하는 함수 구현

```javascript
const isIterable = (v) =>
  v !== null && typeof v[Symbol.iterator] === "function";
```

2. 이터레이터: 이터러블의 Symbol.iterator 메소드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이터러블의 Symbol.iterator 메소드가 반환한 이터레이터는 next 메소드를 갖는다. 이터레이터의 next 메소드는 이터러블의 각 요소를 순회하기 위한 포인터의 역할을 한다. 이터레이터 리절트 객체의 value 프로퍼티는 현재 순회 중인 이터러블의 값을 나타내며, done 프로퍼티는 이터러블의 순회 완료 여부를 나타낸다.(boolean)

## 2. 빌트인 이터러블

1. Array.prototype[Symbol.iterator]
2. String.prototype[Symbol.iterator]
3. Map.prototype[Symbol.iterator]
4. Set.prototype[Symbol.iterator]
5. TypedArray.prototype[Symbol.iterator]
6. arguments[Symbol.iterator]
7. NodeList.prototype[Symbol.iterator]
8. HTMLCollection.prototype[Symbol.iterator]

## 3. for...of문

for...fo 문은 for...in문과 유사하다

```javascript
for (변수선언 of 이터러블) {
}
```

for...in문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하면서 열거한다. 이때 프로퍼티 키가 심볼인 프로퍼티는 열거하지 않는다.

for...of문은 내부적으로 이터레이터의 next 메소드를 호출하여 이터러블을 순회하며 next 메소드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for...of문의 변수에 할당한다. 그리고 이터레이터 리절트 객체의 done 프로퍼티 값이 false면 이터러블의 순회를 계속하고 true이면 중단한다.

## 4. 이터러블과 유사 배열 객체

유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다. 유사 배열 객체에는 Symbol.iterator 메소드가 없기 때문에 for...of문으로 순회할 수 없다. 단, arguments, NodeList, HTMLCollection은 유사 배열 객체이면서도 이터러블이다.

## 5. 이터레이션 프로토콜의 필요성

만약 순회 가능한 데이터 구조들이 각각의 순회 방식을 가지고 있다면 효율적이지 않다. 다양한 데이터 공급자(Array, String, Map/Set 등)과 데이터 소비자(for...of, 스프레드 문법 등)을 잇는 인터페이스의 역할을 한다.

## 6. 사용자 정의 이터러블

1. 구현  
   이터레이션 프로토콜을 준수하지 않는 일반 객체도 이터레이션 프로토콜을 준수하도록 구현하면 사용자 정의 이터러블이 된다.

```javascript
const fibonacci = {
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    const max = 10;

    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { value: cur, done: cur >= max };
      },
    };
  },
};
```

2. 이터러블을 생성하는 함수  
   앞의 fibonacci 함수는 내부에 수열의 최대값 max를 가지고 있고, 이는 고정되어 수정할 수 없는 아쉬움이 있다. 이 최대값을 외부에서 전달할 수 있도록 수정한 버젼.

```javascript
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        },
      };
    },
  };
};
```

3. 이터러블이면서 이터레이터인 객체를 생성하는 함수.  
   앞의 함수는 이터러블을 반환하고, 이터레이터를 생성하려면 이터러벌의 Symbol.iterator 메소드를 호출해야 한다.  
   기본 형식:

```javascript
[Symbol.iterator]() { return this; },
next() {
  return { value: any, done: boolean };
}
```

fibonacci 응용

```javascript
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur, done: cur >= max };
    },
  };
};

let iter = fibonacciFunc(10);

//이터러블
for(const num of iter) {
  console.log(num); //1 2 3 5 8
}

//이터레이터
iter = fibonacciFunc(10);
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: 5, done: false }
console.log(iter.next()); // { value: 8, done: false }
```

4. 무한 이터러블의 지연 평가
```javascript
const fibonacciFunc = function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() { return this; },
    next() {
      [pre, cur] = [cur, pre + cur];
      //done을 생략하여 무한 구현
      return{ value: cur };
    }
  }
}
```

이터러블은 데이터 공급자의 역할을 한다. 배열이나 문자열 등은 모든 데이터를 메모리에 미리 확보한 다음 데이터를 공급한다. 하지만 위 예제의 이터러블은 지연 평가를 통해 데이터를 생성한다. 데이터가 필요한 시점 이전까지는 생성하지 않다가 데이터를 필요로 할 떄 생성하는 기법이다.  
for...of 문이나 배열 디스트럭쳐링 할당 등이 실행되기 이전까지 데이터를 생성하지 않는다. next 메소드를 호출했을 때 비로소 다음 데이터를 생성한다.   
잋럼 지연 평가를 사용하면 불필요한 데이터를 미리 생성하지 않기 떄문에 불필요한 메모리를 소비하지 않으며, 무한도 표현할 수 있다는 장점이 있다.
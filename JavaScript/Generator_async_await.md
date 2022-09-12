# 제너레이터와 async/await

## 1. 제너레이터

코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수다.

1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양보할 수 있다.  
   제너레이터 함수는 실행을 함수 호출자가 일시 중지시키거나 재개시킬 수 있다.
2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.  
   제너레이터 함수는 함수 호출자에게 상태를 전달받을 수 있고 전달 받을 수도 있다.
3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.  
   제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환한다.

## 2. 제너레이터 함수의 정의

```javascript
//제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

const genExpFunc = function* () {
  yield 1;
};

const obj = {
  *genObjMethod() {
    yield 1;
  },
};
```

제너레이터 함수는 화살표 함수로 정의할 수 없고, 생성자 함수로 호출할 수 없다.

```javascript
const genArrowFunc = * () => {
  //안됨
}

function* genFunc() {
  yield 1;
}

new genFunc(); //TypeError
```

## 3. 제너레이터 객체

제너레이터 함수를 호출하면 함수 코드블록을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다. 이러한 객체는 이터러블이면서 동시에 이터레이터다.

```javascript
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = genFunc();
```

제너레이터 객체는 next 메소드를 갖는 이터레이터지만 이터레이터에는 없는 return, throw 메소드를 갖는다.

1. next 메소드: 제너레이터 함수의 yield 표현식까지 코드 블록을 실행하고 yield된 값을 value 프로퍼티 값으로, false를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

2. return 메소드: 인수로 전달받은 값을 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

3. throw 메소드: 인수로 전달받은 에러를 발생시키고 undefined를 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

## 4. 제너레이터의 일시 중지와 재개

이터레이터의 next 메소드와 달리 제너레이터 객체의 next 메소드에는 인수를 전달할 수 있다. 제너레이터 객체의 next 메소드에 전달한 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당된다.

```javascript
function* genFunc() {
  const x = yield 1;

  const y = yield x + 10;
  //마지막 next의 value값에 할당, 일반적으로 제너레이터의 반환값은 의미가 없기 때문에 return문은 종료의 의미로만 사용해야 한다.
  return x + y;
}

const generator = genFunc();

let res = generator.next(); //{value: 1, done: false}
res = generator.next(10); //{vlaue: 20, done: false}, x = 10
res = generator.next(20); //{value: 30, done: true}, y = 20
```

## 5. 제너레이터의 활용

1. 이터러블의 구현

```javascript
//무한 피보나치 수열
const infiniteFibonacci = (function* () {
  let [pre, cur] = [0, 1];

  while (true) {
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
})();
```

2. 비동기 처리

제너레이터 함수는 next 메소드와 yield 표현식을 통해 함수 호출자와 상태를 주고받을 수 있다. 프로미스의 후속 처리 메소드 then/catch/finally 없이 비동기 처리 결과를 반환하도록 구현할 수 있다.

```javascript
const async = (generatorFunc) => {
  const generator = generatorFunc();

  const onResolved = (arg) => {
    const result = generator.next(arg);

    return result.done
      ? result.done
      : result.value.then((res) => onResolved(res));
  };

  return onResolved;
};

async(function* fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  const response = yield fetch(url);
  const todo = yield response.json();
  console.log(todo);
})();
```

## 6. async/await

제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작하도록 구현할 수 있는 async/await가 ES8부터 도입되었다.

### 1. async 함수

await 키워드는 반드시 async 함수 내부에서 사용해야 한다. async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다. async 함수가 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve 하는 프로미스를 반환한다.

```javascript
async function foo(n) {
  return n;
}

const bar = async function (n) {
  return n;
};

const baz = async (n) => n;

const obj = {
  async foo(n) {
    return n;
  },
};
```

다만 클래스의 constructor 메소드는 async 메소드가 될 수 없다.

### 2. await 키워드

await 키워드는 프로미스가 settled 상태가 될 때 까지 대기하다 settled 상태가 되면 프로미스가 resolve 한 처리 결과를 반환한다.

```javascript
const getGithubUserName = async (id) => {
  const res = await fetch(`https://api.github.com/users/${id}`);
  const { name } = await res.json();
  console.log(name); // name 출력 -> 비동기 처리가 아닌 것 처럼 실행
};
```

### 3. 에러 처리

async/await에서 에러 처리는 try...catch 문을 사용할 수 있다. 콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.

```javascript
const foo = async () => {
  try {
    const wrongUrl = "https://wrong.url";

    const response = await fetch(wrongUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err); // TypeError: Failed to fetch
  }
};
```

async 함수 내에서 catch 문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject 하는 프로미스를 반환한다. 따라서 catch 후속 처리 메소드를 사용해 에러를 캐치할 수도 있다.

# 프로미스

## 1. 비동기 처리를 위한 콜백 패턴의 단점

### 1. 콜백 헬

```javascript
const get = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.xtatusText}`);
    }
  };
};

get("https://jsonplaceholder.typicode.com/posts/1");
```

get은 비동기 함수다. 비동기 함수란 함수 내부에 비동기로 동작하는 코드를 포함한 함수를 말한다. 비동기 함수를 호출하면 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고 즉시 종료된다. 즉 비동기 함수 내부의 비도익로 동작하는 코드는 비동기 함수가 종료된 이후에 완료된다. 따라서 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.

```javascript
let g = 0;

setTimeout(() => {
  g = 100;
}, 0);

console.log(g); //0
```

GET 요청을 전송하고 서버의 응답을 전달받는 get 함수도 비동기 함수다. get 함수가 비동기 함수인 이유는 get 함수 내부의 onload 이벤트 핸들러가 비동기로 동작하기 때문이다.

따라서 비동기 함수는 처리 결과를 외부에 반환할 수 없고(모든 실행이 끝나고 콜 스택이 비어야 실행되기 때문에) 후속 처리 등은 비동기 함수 내부에서 수행해야 한다. 이때 비동기 함수를 범용적으로 사용하기 위해 비동기 함수에 비동기 처리 결과에 대한 후속 처리를 수행하는 콜백함수를 전달하는 것이 일반적이다.

이때 콜백 함수가 중첩되어 가독성을 나쁘게하고 실수를 유발한다.

```javascript
get("/step1", (a) => {
  get(`/step2/${a}`, (b) => {
    get(`/step3/${b}`, (c) => {
      get(`/step4/${c}`, (d) => {
        console.log(d);
      });
    });
  });
});
```

### 2. 에러 처리의 한계

비동기 처리를 위한 콜백 패턴의 문제점 중에서 가장 심각한 것은 에러 처리가 곤란한다는 것이다.

```javascript
try {
  setTimeout(() => {
    throw new Error("Error!");
  }, 1000);
} catch (e) {
  //에러를 캐치하지 못한다
  console.error("캐치한 에러", e);
}
```

setTimeout 함수의 콜백 함수가 실행될 때는 이미 다른 콜 스택의 처리가 끝난 이후이기 때문에 catch문에서 에러를 잡을 수 없다.

## 2. 프로미스의 생성

Promise 생성자 함수를 new 연산자와 함께 후출하면 프로미스를 생성한다.  
Promise 생성자 함수는 비동기 처리를 수행할 콜백함수를 인수로 전달받는데 이 콜백 함수는 resolve와 reject 함수를 인수로 전달받는다.

```javascript
const promiseGet = url => {
  return new Promise((resolve, reject) => {
    cosnt xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        //성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
        resolve(JSON.parse(xhr.response));
      } else {
        // 에러 처리를 위해 reject 함수를 호출한다.
        reject(new Error(xhr.status));
      }
    }

  })
}
```

프로미스는 현재 비동기 처리가 어떻게 진행되고 있는지를 나타내는 상태 정보를 [[PromiseStatus]] 내부 슬롯에 가진다.

1. pending: 비동기 처리가 아직 수행되지 않은 상태
2. fulfilled: 비동기 처리가 수행된 상태(성공), resolve 함수가 호출된 후
3. rejected: 비동기 처리가 수행된 상태(실패), reject 함수가 호출된 후

그리고 처리의 결과를 [[PromiseValue]] 내부 슬롯에 할당한다.

비동기 처리가 성공하면 프로미스는 pending 상태에서 fulfilled 상태로 변화한다. 그리고 비동기 처리 결과로 resolve 함수에 인수로 전달한 값을 갖는다.

비동기 처리가 실패하면 pending 상태에서 rejected 상태로 변화하고, 비동기 처리 결과인 Error 객체를 값으로 갖는다.

## 3. 프로미스의 후속 처리 메소드

프로미스의 비동기 처리 상태가 변화하면 이에 따른 후속 처리를 해야한다. 예를 들어, 프로미스가 fulfilled 상태가 되면 프로미스의 처리 결과를 가지고 무언가를 해야하고, 프로미스가 rejected 상태가 되면 프로미스의 처리 결과를 가지고 에러 처리를 해야한다. 이를 위해 프로미스는 후속 메소드 then, catch, finally를 제공한다.

1. Promise.prototype.then: then 메소드는 두 개의 콜백 함수를 인수로 전달받는다. 첫 번째 콜백 함수는 프로미스가 fulfilled 상태가 되면 호출하고, 두 번째 콜백 함수는 프로미스가 rejected상태가 되면 호출한다. 이때 콜백 함수들은 프로미스의 결과를 인수로 전달받는다.

```javascript
new Promise((resolve) => resolve("fulfilled")).then(
  (v) => console.log(v),
  (e) => console.error(e)
); // fulfilled

new Promise((_, reject) => reject(new Error("rejected"))).then(
  (v) => console.log(v),
  (e) => console.error(e)
); // Error: rejected
```

then 메소드는 언제나 프로미스를 반환한다. 만약 then 메소드의 콜백 함수가 프로미스를 반환하면 그 프로미스를 그대로 반환하고, 콜백함수가 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 resolve 또는 reject하여 프로미스를 생성해 반환한다.

2. Promise.prototype.catch: 한 개의 콜백함수를 인수로 전달받는다. 프로미스가 rejected 상태인 경우만 호출된다. then 메소드와 동일하게 동작한다. 따라서 then 메소드와 마찬가지로 언제나 프로미스를 반환한다.

3. Promise.prototype.finally: 한 개의 콜백함수를 인수로 전달받는다. finally 메소드의 콜백함수는 프로미스의 상태와 상관없이 무조건 한 번 실행되고 언제나 프로미스를 반환한다.

## 4. 프로미스의 에러 처리

비동기 처리에서 발생한 에러는 then 메소드의 두 번째 콜백 함수, catch메소드의 콜백함수를 통해 처리할 수 있다. 그러나 then 메소드의 두 번째 인수로 전달된 콜백 함수는 then 함수의 첫 번째 콜백 함수에서 발생하는 에러를 잡지 못한다. 따라서 then 메소드를 호출하여 정상 처리 이후에 에러는 후속으로 처리하는 것이 좋다.

```javascript
promiseGet("url")
  .then((res) => console.log(rex))
  .catch((err) => console.error(err));
```

## 5. 프로미스 체이닝

콜백 헬을 해결하기 위해 프로미스는 프로미스는 then, catch, finally 후속 처리 메소드를 통해 콜백 헬을 해결한다. 후속 처리 메소드들은 언제나 프로미스를 반환하므로 연속적으로 호출할 수 있다. 이를 프로미스 체이닝이라 한다.

```javascript
const url = "url";

promisGet(`${url}/posts/1`)
  .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
  .then((userInfo) => console.log(userInfo))
  .catch((err) => console.error(err));
```

콜백 패턴은 가독성이 좋지 않다. 이 문제는 ES8에서 도입된 async/await를 통해 해결할 수 있다.

### async / await

프로미스를 사용하는 함수(resolveAfter2Seconds) -> 비동기 처리됨 -> 기존 함수라면 result를 출력하고 프로미스 함수가 실행되지만 이를 기다리고 실행하는게 async/await

```javascript
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}

asyncCall();
```

## 6. 프로미스의 정적 메소드

### 1. Promise.resolve / Promise.reject

해당 메소드들은 이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용한다.

Promise.resolve 메소드는 인수로 전달받은 값을 resolve하는 프로미스를 생성한다.

```javascript
const resolvedPromise = Promise.resolve([1, 2, 3]);
resolvedPromise.then(console.log); // [1, 2, 3]
// <=>
const resolvedPromise = new Promise((resolve) => resolve([1, 2, 3]));
resolvedPromise.then(console.log); //[1, 2, 3]
```

Promise.reject 메소드 또한 동일

### 2. Promise.all

여러 개의 비동기 처리를 모두 병렬 처리할 때 사용한다. 인수로 전달받은 배열의 모든 프로미스를 병렬적으로 실행한다.  
Promise.all 메소드는 인수로 전달받은 배열의 모든 프로미스가 모두 fulfilled 상태가 되면 종료한다. 모든 프로미스가 fulfilled 상태가 되면 resolve 된 ㅊ리 결과를 모두 배열에 저장해 새로운 프로미스를 반환한다.

Promise.all 메소드는 인수로 전달받은 배열의 프로미스가 하나라도 rejected 상태가 되면 나머지 프로미스가 fulfilled 상태가 되는 것을 기다리지 않고 즉시 종료한다.

아래 예제는 깃허브 아이디로 깃허브 사용자 이름을 취득하는 3개의 비동기 처리를 모두 병렬로 처리하는 예제다.

```javascript
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};

const githubIds = ["jeresig", "ahejsberg", "ungmo2"];

Promise.all(
  githubIds.map((id) => promiseGet(`https://api.github.com/users/${id}`))
)
  .then((users) => users.map((user) => user.name))
  .then(console.log)
  .catch(console.error);
```

### 3. Promise.race

Promise.race 메소드는 Promise.all 메소드와 동일하게 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 받는다. Promise.race 메소드는 가장 먼저 fulfilled 상태가 되는 프로미스의 처리 결과를 resolve하는 새로운 프로미스를 반환한다.

### 4. Promise.allSettled

Promise.allSettled 메소드는 프로미스를 요소로 갖는 배열 드으이 이터러블을 인수로 전달받는다. 전달받은 프로미스가 모두 settled 상태가 되면 처리 결과를 배열로 반환한다. (rejected 상태가 되는 것도 기다림)

## 7. 마이크로태스크 큐

프로미스의 후속 처리 메소드의 콜백 함수는 태스크 큐가 아니라 마이크로 태스크 큐에 저장된다. 마이크로태스크 큐는 태스크 큐와는 별도의 큐다. 콜백 함수나 이벤트 핸들러를 일시 저장한다는 점에서 태스크 큐와 동일하지만 마이크로태스크 큐는 태스크 큐보다 우선순위가 높다. (콜 스택이 비면 태스크 큐보다 마이크로태스크 큐에서 대기하고있는 함수를 먼저 콜 스택으로 가져와 실행한다.)

## 8. fetch

fetch 함수는 XMLHttpRequest 객체보다 사용법이 간단하고 프로미스를 지원하기 때문에 비동기 처리를 위한 콜백 패턴의 단점에서 자유롭다.

fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환한다. fetch함수의 첫 번쨰 인수로 HTTP 요청을 전송할 URL만 전달하면 GET 요청을 전송한다.

```javascript
fetch("https://jsonplaceholder.typicode.com/todos/1").then(console.log);
```

fetch함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 프로미스를 반환하므로 후속 처리 메소드 then을 통해 프로미스가 resolve한 Response 객체를 전달받을 수 있다. Response 객체는 HTTP 응답을 나타내는 다양한 프로퍼티를 제공한다.

Response.prototype에는 Response 객체에 포함되어 있는 HTTP 응답 몸체를 위한 다양한 메소드를 제공한다. 예를 들어 fetch 함수가 반환한 프로미스가 래핑하고 있는 MIME 타입이 application/json인 HTTP 응답 몸체를 취득하려면 Response.prototype.json 메소드를 사용한다. Response.prototype.json 메소드는 Response 객체에서 HTTP 응답 몸체를 취득하여 역직렬화한다.

```javascript
fetch("https://jsonplaceholder.typicode.com/todos/1")
  //json()메소드는 json파일로 바꿔준다.
  .then((response) => response.json())
  .then(console.log);
```

fetch 함수를 사용할 때는 에러 처리에 주의해야 한다.

```javascript
const wrongUrl = "wrongUrl";
fetch(wrongUrl)
  .then(() => console.log("ok"))
  .catch(() => console.log("error"));
```

부적절한 URL이 지정되었기 때문에 404 Not Found 에러가 발생하고 catch 후속 처리 메소드에 의해 'error'가 출력될 것 같지만 'ok'가 출력된다.

fetch 함수가 반환하는 프로미스는 기본적으로 404 Not Found나 500 Internal Server Error와 같은 HTTP 에러가 발생해도 에러를 reject하지 않고 불리언 타입의 ok 상태를 false로 설정한 Response 객체를 Resolve한다. 오프라인 등의 네트워크 장애나 CORS 에러에 의해 요청이 완료되지 못한 경우에만 프로미스를 reject한다.  
따라서 fetch 함수를 사용할 때는 fetch 함수가 반환한 프로미스가 resolve한 불리언 타입의 ok 상태를 확인해 명시적으로 에러를 처리할 필요가 있다.

```javascript
fetch(wrongUrl)
  .then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then((todo) => console.log(todo))
  .catch((err) => console.error(err));
```

# Ajax

## 1. Ajax

이전 웹페이지는 html태그로 시작해서 html 태그로 끝나는 완전한 HTML을 서버로부터 전송받아 웹페이지 전체를 처음부터 다시 렌더링 하는 방식으로 동작했다. 하지만 이런 방식은 단점이 있다.

1. 변경할 필요가 없는 부분까지 포함된 완전한 HTML을 서버로부터 매번 전송받기 때문에 불필요한 데이터 통신이 발생한다.
2. 화면이 순간적으로 깜빡인다.
3. 클라이언트와 서버와의 통신이 동기 방식으로 동작하기 때문에 서버로부터 응답이 있을 때 까지 다음 처리는 블로킹된다.

Ajax는 웹페이지의 변경할 필요가 없는 부분은 렌더링하지 않고, 변경할 부분만 한정적으로 렌더링하는 방식을 가능하게 했다.

## 2. JSON

JSON은 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷이다.

1. JSON 표기 방식: 자바스크립트의 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트다. JSON의 키는 반드시 큰따옴표로 묶어야 한다.

2. JSON.stringify: JSON.stringify 메소드는 객체를 JSON 포맷의 문자열로 변환한다. JSON.stringify 메소드는 객체 뿐 아니라 배열도 JSON 포맷의 문자열로 변환한다.

3. JSON.parse: JSON 포맷의 문자열을 객체로 변환한다.

## 3. XMLHttpRequest

### 1. XMLHttpRequest 객체 생성: 생성자 함수 호출하여 생성, 브라우저 환경에서만 정상적으로 실행된다.

```javascript
const xhr = XMLHttpRequest();
```

### 2. 프로퍼티와 메소드

프로토타입 프로퍼티

1. readyState: HTTP 요청의 현재 상태를 나타내는 정수 XMLHttpRequest의 정적 프로퍼티를 값으로 가진다.  
   UNSENT: 0, OPEND: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4

2. status: HTTP 요청에 대한 응답 상태(HTTP 상태 코드)를 나타내는 정수

3. statusText: HTTP 요청에 대한 응답 메시지를 나타내는 문자열

4. responseType: HTTP 응답 타입

5. response: HTTP 요청에 대한 응답 몸체 responseType에 따라 다르다.

이벤트 핸들러 프로퍼티 (함수 할당)

1. onreadystatechange: readyState 프로퍼티 값이 변경된 경우

2. onerror: HTTP 요청에 에러가 발생한 경우

3. onload: HTTP 요청이 성공적으로 완료한 경우

프로토타입 메소드

1. open: HTTP 요청 초기화

2. send: HTTP 요청 전송

3. abort: 이미 전송된 HTTP 요청 중단

4. setRequestHeader: 특정 HTTP 요청 헤더의 값을 설정

### 3. HTTP 요청 전송

1. XMLHttpRequest.prototype.open 메소드로 HTTP 요청을 초기화한다.

2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메소드로 특정 HTTp 요청의 헤더 값을 설정한다.

3. XMLHttpRequest.prototype.send 메소드로 HTTP 요청을 전송한다.

```javascript
const xhr = new XMLHttpRequest();

//HTTp 요청 초기화
xhr.poen("GET", "/users");

//HTTP 요청 헤더 설정
//클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.setRequestHeadr("content-type", "application/json");

//HTTP 요청 전송
xhr.send();
```

### XMLHttpRequest.prototype.open(method, url[, async = true])

open 메소드는 서버에 전송할 HTTP 요청을 초기화한다. 주로 5가지 요청 메소드를 사용하여 CRUD를 구현한다. (GET, POST, PUT, PATCH DELETE)

### XMLHttpRequest.prototype.send()

send 메소드는 open 메소드로 초기화된 HTTP 요청을 서버에 전송한다. 전송 방식에는 GET, POST 요청 메소드에 따라 차이가 있다.

1. GET인 경우: send 메소드에 페이로드로 전달할 인수는 무시되고 요청 몸체는 null로 설정된다. (get은 url로 전달)
2. POST인 경우: 몸체에 담아 전송할 페이로드를 인수로 전달할 수 있다. 객체인 경우 JSON.stringify 메소드를 사용하여 직렬화한 다음 전달해야한다.

### XMLHttpRequest.prototype.setRequestHeader()

setRequestHeader 메소드는 특정 HTTP 요청의 헤더 값을 설정한다. setRequestHeader 메소드는 반드시 open 메소드를 호출한 이후에 호출해야 한다. 자주 사용하는 HTTP 요청 헤더인 Content-type과 Accept에 대해 살펴보자.

Content-type은 요청 몸체에 담아 전송할 데이터의 MIME 타입 정보를 표현한다. 자주 사용하는 MIME 타입은 다음과 같다.

1. text: text/plain, text/html, text/css, text/javascript
2. application: application/json, application/x-www-form-urlencode
3. multipart: multiplart/formed-data

### 4. HTTP 응답 처리

서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 한다.

```javascript
const xhr = new XMLHttpRequest();

xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1");

xhr.send();

xhr.onreadystatechange = () => {
  //전송 완료 아니면 아무것도 안함, onload일 경우 처리 안 해줘도 됨
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
  } else {
    console.error("Error", xhr.status, xhr.statusText);
  }
};

xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
  } else {
    console.error("Error", xhr.status, xhr.statusText);
  }
};
```

# REST API

## 1. REST API의 구성
REST API는 자원(resource), 행위(verb), 표형(representations)의 3가지 요소로 구성된다. REST는 자체 표현 구조로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있다.

## 2. REST API 설계 원칙

### 1. URI는 리소스를 표현해야 한다.

URI는 리소스를 표현하는 데 중점을 두어야 한다. 리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용ㅎ나다. 따라서 일므에 get 같은 행위에 대한 표현이 들어가서는 안 된다.
```
# bad
GET /getTodos/1
GET /todos/show/1

#good
GET /todos/1
```

### 2. 리소스에 대한 행위는 HTTP 요청 메소드로 표현한다.

리소스에 대한 행위는 HTTP 요청 메소드를 통해 표현하며 URI에 표현하지 않는다. 리소스를 취득하는 경우에는 GET, 리소스를 삭제하는 경우에는 DELETE를 사용하여 리소스에 대한 행위를 명확히 표현한다.
```
# bad
GET /todos/delete/1

# good
DELETE /todos/1
```

## 3. JSON Server를 이용한 REST API 실습


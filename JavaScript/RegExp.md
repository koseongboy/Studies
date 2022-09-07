# 정규 표현식

## 1. 정규 표현식 생성

정규 표현식 리터럴은 패턴과 플래그로 구성된다.

그냥 리터럴로 생성할 수도 있고, 생성자 함수를 통해 생성할 수도 있다.

```javascript
const regexp = /is/i;
// 형식: /패턴/플래그
const regexp2 = new RegExp(/is/i);
```

## 2. 메소드

String 클래스에서 다시 확인할 메소드가 몇몇 있음.

1. RegExp.prototype.exec(String): 인수로 전달받은 문자열에 대해 매칭 결과를 반환한다. 검색 결과가 없을 경우 null을 반환한다.

2. RegExp.prototype.test(String): 인수로 전달받은 문자열에 대해 정규식 패턴을 검색하여 매칭 결과를 불리언 타입으로 반환한다.

3. String.prototype.match(RegExp): 인수로 전달받은 정규식 표현에 대하여 매칭 결과를 반환한다.

## 3. 플래그

원래는 여섯 개지만 중요한 세 개만.

1. i: 대소문자를 구분하지 않고 패턴을 검색한다.

2. g: 대상 문자열 내에서 패턴과 일치하는 모든 패턴을 전역 검색한다.

3. m: 문자열의 행이 바뀌어도 계속 검색한다.

## 4. 패턴

1. 특정 문자열 검색: /문자열/

2. 임의의 문자 검색: 임의의 문자는 .으로 표현하고 . 하나당 한 글자라 생각하면 됨.

3. 반복 검색:
   > 패턴{m, n} -> 패턴이 최소 m번, 최대 n번 나오는 문자열 검색  
   > 패턴{n} -> 패턴이 n번 등장하는 문자열 검색  
   > 패턴{n, } -> 패턴이 최소 n번 등장하는 문자열 검색.  
   > 패턴+ -> 패턴이 한 번 이상 반복되는 문자열 검색.  
   > 패턴? -> 패턴이 최대 한 번 (0번 포함) 이상 반복되는 문자열을 의미

```javascript
const target "color colour";

const regExp = /colou?r/g;

target.match(regExp); //['color', 'colour']
```

4. OR 검색: 패턴|패턴 으로도 표현 가능, []안의 문자는 OR, 범위는 -로 지정 가능 ([A-Z]+ -> A에서 Z까지 한 번 이상 반복되는 문자열 검색)
5. 특정 의미:
   > \d는 숫자, \D는 숫자가 아닌 문자  
   > \w는 알파벳, 숫자, 언더스코어(\_), \W는 알파벳, 숫자, 언더스코어가 아닌 문자.
6. not 연산: [...]안의 ^는 not을 의미한다.

7. ~~로 시작하는가: [...]밖의 ^패턴은 뒤의 패턴으로 시작하는 지 검사한다.

8. ~~로 끝나는가: 패턴$은 앞의 패턴으로 끝나는 지 검사한다.

## 5. 자주 쓰는 정규식

1. `http://` 혹은 `https://`로 시작하는가:

```javascript
const regExp = /^https?:\/\//;
```

2. html로 끝나는가:

```javascript
const regExp = /html$/;
```

3. 숫자로만 이루어진 문자열 검사

```javascript
const regExp = /^\d+$/;
```

4. 메일 주소 형식(공식):

```javascript
const regExp =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-ZA-Z]{2, 3}$/;
```

5. 휴대폰 번호 형식:

```javascript
const regExp = /^\d{3}-\d{3,4}-\d{4}$/;
```

6. 특수문자 포함 여부

```javascript
const regExp = /[^0-9a-zA-Z]/gi;
```

특수문자를 제거할 때는 String.prototype.replace메소드를 사용한다

```javascript
const target = "abc#123";

target.replace(regExp, "");
```

# 모듈

## 1. 모듈의 일반적 의미

모듈이란 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 말한다. 일반적으로 모듈은 기능을 기준으로 파일 단위로 분리한다. 이때 모듈이 성립하면 모듈은 자신만의 파일 스코프(모듈 스코프)를 가질 수 있어야 한다.

자신만의 파일 스코프를 갖는 모듈의 자산은 기본적으로 비공개 상태다. (다른 모듈에서 접근할 수 없다.)

하지만 애플리케이션과 완전히 분리된 모듈은 재사용이 불가능하므로 존재의 의미가 없다. 모듈은 애플리케이션이나 다른 모듈에 의해 재사용되어야 의미가 있다. 따라서 모듈은 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개가 가능하다. 이를 export라 한다.

## 2. ES6 모듈 (ESM)

모듈의 사용법은 간단하다. script 태그에 type="module" 어트리뷰트를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다. 일반적인 자바스크립트 파일이 아닌 ESM임을 명확히 하기 위해 ESM의 파일 확장자는 mjs를 사용할 것을 권장한다.

```html
<script type="module" src="app.mjs"></script>
```

ESM에는 클래스와 마찬가지로 기본적으로 strict mode가 적용된다.

### 1. 모듈 스코프

ESM은 독자적인 모듈 스코프를 가진다. ESM이 아닌 일반적인 자바스크립트 파일은 script 태그로 분리해서 로드해도 독자적인 모듈 스코프를 갖지 않는다. (전역 변수 등을 공유한다)

### 2. export 키워드

export 키워드는 선언문 앞에 사용한다. 따라서 모든 식별자를 export 할 수 있다.

```javascript
export const pi = Math.PI;

export function square(x) {
  return x * x;
}
```

매번 붙이기 귀찮다면 객체에 담아 한 번에 export 할 수 있다.

```javascript
const pi = Math.PI;

function square(x) {
  return x * x;
}

export { pi, square };
```

### 3. import 키워드

다른 모듈이 export한 식별자 이름으로 import해야 하며 ESM의 경우 파일 확장자를 생략할 수 없다.

```javascript
import { pi, square } from "./lib.mjs";
```

모듈이 export한 식별자 이름을 일일이 지정하지 않고 이름으로 한 번에 import 할 수도 있다. 이때 import되는 식별자는 as 뒤에 지정한 이름의 객체에 프로퍼티로 할당된다.

```javascript
import * as lib from "./lib.mjs";

console.log(lib.pi); //3.141592...
console.log(lib.square(10)); //100
```

모듈이 export한 식별자 이름을 import할 수도 있다.

```javascript
import { pi as PI, square as sq } from "./lib.mjs";
```

모듈에서 하나의 값만 export한다면 default 키워드를 사용할 수 있다. default 키워드를 사용하는 경우 기본적으로 이름 없이 하나의 값을 export한다.

```javascript
export default (x) => x * x;
```

default 키워드를 사용하는 경우 var, let, const 키워드는 사용할 수없다.

```javascript
export default const foo = () => {}; //SyntaxError
//export default () => {};
```

default키워드와 함께 export한 모듈은 {} 없이 임의의 이름으로 import한다.

```javascript
import square from "./lib.mjs";
```

# This 키워드

## 1. This?

객체의 동작을 나타내는 메소드는 자신이 속한 객체의 프로퍼티를 참조하고 변경할 수 있어야 한다. 그렇다면 생성자 함수에 직접 접근하면 된다. 그러나 이러한 방법은 앞으로 생성될 인스턴스에는 적용이 되지 않는다.

```javascript
function Circle(radius) {
  radius = radius;
}

Circle.prototype.getDiameter = function () {
  return 2 * Circle.radius;
};

const circle = new Circle(5);
console.log(circle.getDiameter()); //???
```

이를 해결하기 위한 것이 바로 this 식별자이다. this는 자신이 속한 객체, 자신이 생성할 인스턴스를 가리킨다.

### this 바인딩

this는 함수 호출 방식에 따라 동적으로 결정된다.

1. 객체 리터럴: this 메서드를 호출한 객체를 가리킨다. -> 일반 함수 호출의 경우 전역 객체가 this에 바인딩된다. (전역 객체가 호출한 것으로 취급)
2. 생성자 함수: 생성자 함수가 생성할 인스턴스를 가리킨다.
3. 화살표 함수: 상위 스코프의 this를 가리킨다.
4. 메소드 호출: 메소드 이름 앞의 .연산자 앞에 기술한 객체가 바인딩된다. (메소드를 소유한 객체에 관계 없이 .연산자 앞에 기술한 객체가 바인딩됨.)
5. Function.prototype.call/apply/bind 메소드로 간접호출:   
함수.call(thisArg, arg1, arg2..): 첫 인수에 전달한 객체를 this에 바인딩, 둘째 부터의 인수는 함수에 전달할 매개변수.   
함수.apply(thisArg, argsArray]): 첫 인수는 위와 같고, 둘째 인수는 매개변수를 리스트배열, 유사 배열 객체로 전달.
함수.bind(thisArg): 첫 인수는 위와 같다. 하지만 bind()의 경우 함수를 호출하지 않고 반환한다. 따라서 함수.bind(thisArg)()등과 같이 명시적으로 따로 호출을 해줘야한다.

```javascript
function getThisBind() {
  return this;
}
const thisArg = { a: 1 };

console.log(getThisBinding()); //window
console.log(getThisBinding.apply(thisArg)); //{a: 1}
```

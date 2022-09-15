# 클래스

클래스 상속

1. 자식 클래스에서 constructor를 작성할 때는 super()를 호출해줘야 한다. (하지 않으면 에러)

2. 오버라이드: 가능(어노테이션 x)

```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHello() {
    console.log("hi");
  }
}

class Programmer extends Person {
  constructor(name: string) {
    suber(name);
  }
  fixBug() {
    console.log("버그 수정 완료");
  }
}
```

접근제한자 지원, 기본 값은 public  
public, protected, private (자바스크립트와 마찬가지로 private을 #으로 사용 가능)

readonly 키워드: constructor로만 수정 가능한 변수

constructor의 매개변수 앞에 접근제한자, readonly를 놓으면 자동으로 필드 설정 가능

```typescript
class Person {
  constructor(public name: string, public age: number) {}
}

const person = new Person("고성현", 21);
console.log(person.name, person.age); //고성현 21
```

자바스크립트와 마찬가지로 getter, setter 지원

```typescript
class Person {
  private _name: string = "";

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (newName.length > 10) {
      throw new Error("최대 길이를 넘었습니다");
    }
    this._name = newName;
  }
}

let person = new Person();
person.name = "fdsfasdfasdfsadfasdf"; //Error
```

static 키워드 사용 가능

추상 클래스 생성 가능

```typescript
abstract class Person {
  constructor(public name: stirng) {}
  abstract sayHello(): void;
}
```

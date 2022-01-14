# 상속
## 1. 개념
부모 클래스의 멤버를 자식 클래스에게 물려주는 것.
* 부모 클래스에서 private 접근 제한을 갖는 멤버는 물려주지 않음.
* 다중 상속 불가 (Java)

## 2. super
### super()
* 부모 클래스의 생성자를 호출
* 모든 자식 클래스의 생성자에는 'super();'가 생략되어있음 (명시적으로 부모 클래스의 생성자를 호출하지 않았을 경우)
* 주의점: 부모 클래스에 기본 생성자가 없다면 자식 클래스의 생성자에서는 꼭 부모 클래스의 생성자를 명시적으로 호출해야함.
  부모 클래스
  ```java
  public class Parent {
      public Parent(int k) { ~~ }
  }
  ```
  자식 클래스 (문제)
  ```java
  public class Child {
      public Child() { ~~ } //오류 발생 (super(매개변수)꼴로 생성자를 명시적으로 호출해야함)
  }
  ```
  자식 클래스 (개선)
  ```java
  public class Child {
      public Child() {
      super(1);
      } 
  }
  ```
### super
  * 오버라이딩된 부모 메소드를 호출할 때 사용하는 키워드
  ```java
  super.부모메소드();
  ```

## 3. 오버라이딩
규칙
* 부모 메소드와 리턴 타입, 이름, 매개 변수가 같아야 한다.
* 접근 제한은 같거나 약하게(public하게)
* 새로운 Exception을 throws할 수 없다 (추후 학습 예정)

## 4. final
1. final 클래스: final이 붙은 클래스는 상속할 수 없다.
```java
public final class Class {   }

......

public class Child extends Class {    } //불가능
```
2. final 메소드: final이 붙은 메소드는 오버라이딩 할 수 없다.
```java
public final void method() {  }

......

@Override
public void method() {  } //불가능
```

## 5. 다형성
### 타입 변환
  1. 자동 타입 변환: 부모 타입에 자식 객체 참조 가능
  ```java
   Parent a = new Child();
  ```
  2. 직접적으로 상속된 클래스의 타입이면 자동 변환 가능
  ```java
    class A {}

    class B extends A {}
    class C extends A {}

    class D extends B {}
    class E extends C {}

    public class Class {
      public static void main(String[] args) {
      B b = new B();
      C c = new C();
      D d = new D();
      E e = new E();

      A a1 = b; //(o)
      A a2 = c; //(o)
      A a3 = d; //(o)
      A a4 = e; //(o)

      B b1 = d; //(o)
      C c1 = e; //(o)

      B b2 = e; //(x)
      C c2 = d; //(x)
      }
    }
  ```
  3. 멤버 접근: 부모 타입으로 정의되어 있으므로 부모에 정의되지 않은 멤버에 접근할 수 없음(__오버라이딩 되어있을 경우 자식 클래스의 메소드 호출__)
  ```java
    class Parent {
      void method1() { }
      void method2() { }
    }

    class Child extends Parent{
      @Override
      void method2() { }
      void method3() { }
    }

    class Class {
      public static void main(String[] args){

      Parent parent = new Child();

      parent.method1(); //(o)
      parent.method2(); //(오버라이딩 된 Child의 method2 호출)
      parent.method3(); //(x)
      }
    }
  ```









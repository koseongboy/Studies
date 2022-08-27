# 제네릭

## 제네릭 사용의 이유

1. 컴파일시 강한 타입 체크를 할 수 있다
2. 타입 변환을 제거한다.

## 제네릭 타입(클래스, 인터페이스)

### 선언

```java
    public class ClassName<T> { }
    public interface InterfaceName<T> { }
```

### 사용

```java
    public class Box<T> {
        private T t;
        public T get() { return t; }
        public void set(T t) { this.t = t; }
    }
```

```java
    public class Main {
        public void static main(String[] args) {
            Box<String> box = new Box<String>();
            box.set("hello");
            System.out.println(box.get());
        }
    }
```

## 제네릭 메소드

### 선언

```java
public <T> ReturnType methodName(T t) { }
```

### 사용

```java
public class Util {
    public static <T> Box<T> boxing(T t) {
        Box<T> box = new Box<T>();
        box.set(t);
        return box;
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Box<Integer> box1 = Util.<Integer>boxing(100);
        int intValue = box1.get();
    }
}
```

## 타입 파라미터 제한

타입 파라미터에 타입 제한을 걸어야 할 때 (특정 클래스를 상속하는 클래스들만 파라미터로 받고 싶을 때)

### 사용

```java
<T extends SuperClass>
```

(인터페이스도 똑같이 extends를 사용한다)

## 와일드카드 타입

코드에서 ?를 일반적으로 와일드카드라고 한다.  
제네릭 클래스의 객체를 메소드의 매개변수로 받을 때 사용한다.

> <?>: 제한 없음
> <? extends T> T자기 자신이나 T를 상속받는 클래스들(자식들)만 올 수 있다.
> <? super T> T자기 자신이나 T의 부모들만 올 수 있다.

## 제네릭 타입의 상속/구현

제네릭 타입은 상속/구현을 할 때 추가적인 타입 파라미터를 가질 수 있다.

```java
public class Child<T, M, C> extends Parent<T, M> { }
```

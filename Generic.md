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

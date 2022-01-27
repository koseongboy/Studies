# 인터페이스
## 1. 기초지식
### 1. 역할
개발 코드와 객체가 서로 통신하는 접점 역할.
### 2. 선언
일반적인 선언
```java
  public interface Name { }
```
인텔리J에서의 선언: 원하는 위치에서 우클릭 > New > Java Class > 이름 적을 때 아래 Interface 선택
### 3. 구성 요소
```java
  public interface NewInterface {
    //상수 (일반적인 필드는 선언 x)
    public static final ~~~
    
    //인터페이스의 모든 메소드는 기본적으로 public 접근제한자를 가지므로 기술할 필요 x
    //추상 메소드 (실행 내용 x)
    void method(param);
    
    //디폴트메소드 (실행 내용 o)
    default void defauldMethod(param) { }
    
    //정적 메소드 (실행 내용 o)
    static void staticMethod(param) { }
  }
```

## 2. 구현
### 구현 방법
일반적인 구현
```java
  public class ClassName implements InterfaceName { 
    //필드
    public int field;
    
    //실체 메소드
    @Override
    public void method(param) { }
  }
```
인터페이스의 모든 추상 메소드들을 작성하지 않으면 구현 클래스는 자동으로 추상 클래스가 된다.
<br>
인텔리J에서는 구현클래스 선언 시
```java
  public class Imple3 implements NewInterface{
    
  }
```
까지만 입력하고 alt + Enter > Enter > ok 하면 자동으로 추상 메소드를 오버라이드 해준다.



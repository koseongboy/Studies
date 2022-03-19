# 멀티 스레드
## 메인 스레드
메인 스레드는 main함수의 실행과 동시에 시작된다.   마지막 코드를 실행하거나 return문을 만나면 종료된다.
## 작업 스레드
### Thread 클래스로부터 직접 생성
1. 스레드 생성
Runnable을 매개갑승로 갖는 생성자를 호출해야 한다.   Runnable은 인터페이스로 run()메소드를 가지고 있는데 이 메소드를 재정의해서 스레드가 실행할 코드를 작성해야 한다.
```java
class Task implements Runnable {
  public void run() {
  //스레드가 실행할 코드
  }
}
//********스레드 객체 생성*********
Runnable target = new Task();
Thread thread = new Thread(target);
```
이러한 방법도 있지만 코드를 절약하기 위해 오히려 익명 구현 객체를 더 많이 활용한다.
```java
Thread thread = new Thread( new Runnable() {
  public void run() {
  //스레드가 실행할 코드
  }
});
```
2. 스레드 시작
start()메소드를 호출해야 시작된다.
```java
thread.start();
```
### Thread 하위 클래스로부터 생성
1. Thread클래스를 상속하는 클래스 생성
Runnable을 구현하지 않고 Thread클래스의 run()메소드를 오버라이딩해서 사용
```java
public class ExampleThread extends Thread {
  @Override
  public void run() {
    //스레드가 실행할 코드
  }
}
//********스레드 객체 생성*********
Thread thread = new Examplethread();
```
마찬가지로 익명 객체로도 스레드 객체를 생성할 수 있다.
```
Thread thread = new Thread() {
  public void run() {
    //스레드가 실행할 코드
  }
};
```
2. 스레드 시작
```java
thread.start();
```
### 스레드의 이름
기본적으로 메인 스레드는 main, 작업 스레드는 Thread-n의 형식으로 지정되지만,   
어떤 스레드가 어떤 일을 하는 지 제대로 확인하기 위해 스레드에 이름을 붙일 수 있다.
```java
thread.setName("name");

//or

//스레드 클래스 생성자
public ExampleThread() {
  setName("ThreadName");
}
```
set이 있으니 get도 있을 것이다. (마찬가지로 스레드 클래스 안에서 사용할 수 있다.)
```java
thread.getName();
```
현재 실행중인 스레드의 객체를 얻는 방법도 있다. (static)
```java
Thread thread = Thread.currentThread();
```

## 스레드 우선순위
### 동시성
멀티 스레드의 동시성은 하나의 코어가 여러 스레드를 번갈아가며 실행한다.   
번갈아가면서 실행하는 속도가 워낙 빨라서 병렬성으로 보일 수도 있다.   
이렇게 번갈아가며 스레드를 실행하는 순서를 스레드 스케쥴링이라고 한다.   
자바의 스레드 스케쥴링에는 우선순위 방식과 순환 할당 방식을 사용한다.   
> 순환 할당 방식은 시간 할당량을 정해서 하나의 스레드를 지정된 시간 동안 실행하고 다음 스레드를 실행한다.   
> 우선 순위 방식은 우선순위가 높은 스레드부터 실행하는 것이고 이는 개발자가 코드를 통해 제어 가능하다. (1 ~ 10 사이, 우선순위를 부여하지 않으면 기본적으로 5를 부여받는다.)
  ```java
  thread.setPriority(num);
  ```
> 가독성을 높이기 위해 Thread 클래스의 상수를 이용하기도 한다.
  ```java
  thread.setPriority(Thread.MAX_PRIORITY);
  thread.setPriority(Thread.NORM_PRIORITY);
  thread.setPriority(Thread.MIN_PRIORITY);
  //MAX_PRIORITY = 10, NORM_PRIORITY = 5, MIN_PRIORITY = 1
  ```
### 병렬성
코어 수가 여유가 있다면 그 수 만큼 병렬적으로 처리한다.

## 동기화 메소드, 동기화 블록
### 공유 객체 사용 시 주의점
멀티 스레드 프로그램에서는 스레드들이 객체를 공유해서 작업해야 하는 경우가 있다.   
이경우 다른 스레드에 의해 현재 작업중인 스레드의 객체의 결과가 변하는 경우가 있다. 
  
### 동기화 메소드, 동기화 블록
주의점에서 봤듯이 한 스레드가 작업중인 객체를 다른 스레드가 건들지 못하게 하려면 객체에 잠금을 걸어야 한다.   
멀티 스레드 프로그램에서 하나의 스레드만이 실행할 수 있는 코드 영역을 임계영역이라고 한다.   
자바는 임계 영역을 지정하기 위해 동기화 메소드와 동기화 블록을 제공한다.   
1. 동기화 메소드: 동기화 메소드를 만드는 방법에는 메소드 선언에 synchronized 키워드를 붙이면 된다.   
```java
public synchronized void method() { //임계 영역 }
```
2. 동기화 블록: 블록 내부 부분을 임계 영역으로 만듦
```java
public void method() {
  
  synchronized(공유객체 - 공유 객체가 자기 자신이면 this를 넣을 수 있다. ) {
    //임계 영역
  }

}
```
## 스레드 상태
스레드는 맨 처음 start()메소드를 호출했을 때 실행 대기 상태로 들어간다.   
이렇게 실행 대기 상태로 들어간 스레드는 스레드 스케쥴링에 따라 실행 대기 상태와 실행 상태를 오가다가 코드가 종료가 되면 종료 상태로 전환된다.   
가끔 실행 상태에서 일시 정지 상태로 들어가기도 하는데 이 상태는 스레드가 실행될 수 없는 상태이다.   
이를 해결하기 위해서는 스레드를 실행 대기 상태로 전환시켜줘야 한다.   
   
이런 상태를 확인하기 위해서는 getState() 메소드를 사용해야 한다. getState()함수는 스레드의 상태에 따라서 열거상수를 리턴한다.   
```java
객체 생성: NEW
실행 대기: RUNNABLE
일시 정지: WATING, TImed_WAITING, BLOCKED
종료: TERMINATED
열거 상수 가져오는 법 Thread.State.상수
```

## 스레드 상태 제어
1. 일시정지 -> 실행 대기
> interrupt(): 일시 정지 상태의 스레드에서 InterruptedException예외를 발생 시킴, catch문에서 실행 대기 상태로 가거나 종료 상태로 갈 수 있도록 함.
> notify(), notifyAll(): wait()메소드에 의해 일시 정지 되어있는 스레드를 실행 대기 상태로 만든다.
2. 실행 -> 일시 정지
> sleep(long millis): static 메소드. 주어진 시간 동안 스레드를 일시 정지 상태로 만든다.
```java
try {
  Thread.sleep(1000);
} catch(InterruptedException e) {
  // interrupt() 메소드가 호출되면 실행.
}
```
> join(), join(long millis): 다른 join()메소드를 멤버로 가지는 스레드가 종료되면 실행 대기 상태가 된다.(한 스레드에서 다른 스레드의 join()메소드를 호출하면 그 스레드가 끝날 때 까지 지금 스레드를 일시 정지 상태로 만든다.
```java
try {
  threadA.join(); //threadA가 끝날 때 까지 기다림.
} catch (InterruptedException e) {
}
```
> wait(), wait(long millis): 동기화 블록 내에서 스레드를 일시 정지 상태로 만든다. 시간이 주어지지 않았을 경우 notify(), notifyAll()메소드로 실행 대기 상태로 만들 수 있다.
>> 동기화 블록 내에서 실행한다 -> 스레드의 run()메소드 안에서 실행하는 것이 아니라 스레드의 작업 공간 안에서 사용한다.
>> notify같은 경우 따로 대상을 지정하지 않고, Ojbect클래스에 선언되어있기 때문에 Thread.과 같은 연산자가 필요없다.
3. 실행 -> 실행 대기
> yield(): static 메소드 실행 중에 우선순위가 동일한 다른 스레드에게 실행을 양보하고 실행 대기 상태가 된다.
```java
public void run() {
  while(true) {
    if(work) {
      //실행
    } else {
      Thread.yield();
    }
  }
}
```

## 데몬 스레드
데몬 스레드는 주 스레드의 작업을 돕는 보조 스레드이다.   
따라서 주 스레드가 종료되면 같이 종료된다.   
ex) 워드프로세서의 자동 저장 기능, 미디어 플레이어의 동영상 재생, JVM의 가비지 컬렉터   
### 호출 방법
주 스레드가 데몬스레드가 될 스레드의 setDaemon(true)를 호출해주면 된다.   
```java
public static void main(String[] args) {
  AutoSaveThread thread = new AutoSaveThread();
  thread.setDaemon(true);
  thread.start();
}
```
꼭 setDaemon(true)를 호출하고 나서 start()를 호출해줘야 한다.   

## 스레드 그룹






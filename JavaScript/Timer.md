# 타이머

## 1. 호출 스케줄링

함수를 명시적으로 호출하면 함수가 즉시 실행된다. 만약 함수를 명시적으로 호출하지 않고 일정 시간이 경과된 이후에 호출되도록 함수 호출을 예약하려면 타이머 함수를 사용한다. 이를 호출 스케줄링이라 한다.

## 2. 타이머 함수

### 1. setTimeout / clearTimeout

setTimeout의 매개 변수

> func: 타이머가 만료된 뒤 호출될 콜백 함수  
> delay: 타이머 시간(ms)  
> param1, 2, ...: 콜백 함수에 전달할 매개변수

setTimeout의 경우 타이머 이후 단 한번 실행된다. 그리고 생성된 타이머를 인식할 수 있는 고유 id를 반환값으로 가진다.

clearTimeout의 매개변수로 타이머 고유 id를 전달할 경우 해당 타이머의 콜백함수가 실행되지 않는다.

### 2. setIntaerval/clearInterval

setInterval의 매개 변수

> func: 타이머가 만료된 뒤 호출될 콜백 함수  
> delay: 타이머 시간(ms)  
> param1, 2, ...: 콜백 함수에 전달할 매개변수

setInterval의 경우 타이머가 만료될 떄마다 콜백 함수가 호출된다. 그리고 생성된 타이머를 인식할 수 있는 고유 id를 반환값으로 가진다.

clearInterval의 매개변수로 타이머 고유 id를 전달할 경우 해당 타이머의 콜백함수가 실행되지 않는다.

## 3. 디바운스와 스로틀

scroll, resize, input, mousemove 같은 이벤트는 짧은 시간 간격으로 연속해서 발생한다. 이러면 과도하게 호출되어 성능에 문제를 일으킬 수 있다. 디바운스와 스로틀은 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 과도한 이벤트 핸들러의 호출을 방지하는 프로그래밍 기법이다.

### 1. 디바운스

디바운스는 짧은 시간 간격으로 이벤트가 연속해서 발생하면 이벤트 핸들러를 호출하지 않다가 일정 시간이 경과한 이후에 이벤트 핸들러가 한 번만 호출하도록 한다.

```javascript
const debounce = (callback, delay) => {
  let timerId;

  return (event) => {
    //함수가 다시 호출되면 이전 타이머 없애고 다시 만들기 -> 일정 시간동안 함수 호출이 없어야 콜백 함수가 실행됨.
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};
```

실무에서는 Underscore의 debounce 함수나 lodash의 debounce 함수를 사용한다.

### 2. 스로틀

스로틀은 짧은 시간 간격으로 이벤트가 연속해서 발생하더라도 일정 시간 간격으로 이벤트 핸들러가 최대 한 번만 호출되도록 한다. 이벤트를 그룹화해서 일정 시간 단위로 이벤트 핸들러가 호출되도록 호출 주기를 만든다.

```javascript
const throttle = (callback, delay) => {
  let timerId;

  return (event) => {
    //타이머 아이디가 있다면 아무것도 안한다가
    //delay가 경과했을 때 이벤트가 발생하면 새로운 타이머를 재설정한다.
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};
```

실무에서는 Underscore의 throttle 함수나 lodash의 throttle함수를 사용한다.

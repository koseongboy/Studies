# Date

## 1. Date 생성자 함수

Date 객체는 1970년 1월 1일 0시를 기준으로 지난 ms만큼의 정수값을 가진다.

1. new Date(): 인수 없이 호출하면 현재 날짜와 시간을 가지는 Date 객체를 반환한다.

2. new Date(milliseconds):  1970년 1월 1일 00:00:00을 기준으로 인수로 전달된 밀리초만큼의 경과한 날짜와 시간을 나타내는 Date 객체를 반환한다.

3. new Date(dataString): Date.parse 메소드에 의해 해석 가능한 형식의 문자열을 인수로 전달하면 날짜와 시간을 나타내는 Date 객체를 반환한다.

4. new Date(year, month[, day, hour, minute, second, millisecond]): 연 월은 반드시 지정해야하고 각 매개변수에 맞는 날짜를 가진 Date 객체를 반환한다.

## 2. 메소드

1. Date.now(): 1970년 1월 1일 00:00:00을 기준으로 현재 시간까지 경과한 밀리초를 숫자로 변환한다.

2. Date.parse(): 1970년 1월 1일 00:00:00 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.

3. Date.UTC(year, month[, day, hour, minute, second, millisecond]): 인수로 지정된 시간까지의 밀리초를 숫자로 반환한다.

4. Date.prototype.getFullYear: Date 객체의 연도를 나타내는 정수를 반환한다.

5. Date.prototype.setFullYear(year[, month, date]): Date 객체에 연도를 나타내는 정수를 설정한다. 옵션으로 월, 일도 설정할 수 있다.

6. Date.prototype.getMonth: Date 객체의 월을 나타내는 정수를 반환한다.

7. Date.prototype.setMonth(month[, date]): 객체에 월을 나타내는 0~11의 정수를 설정한다.

8. Date.prototype.getDate: Date 객체의 일을 나타내는 정수를 반환한다.

9. Date.prototype.setDate: Date 객체에 날짜를 나타내는 정수를 설정한다.

10. Date.prototype.getDay: 요일(0~6)을 나타내는 정수를 반환한다.

11. Date.prototype.getHours: 객체의 시간을 나타내는 정수를 반환한다.

12. Date.prototype.setHours(hour[, minute, seconds, ms])

13. Date.prototype.getMinutes/setMinutes/getSeconds/setSeconds/getMilliseconds/setMilliseconds

14. Date.prototype.getTime: 1970년 1월 1일 00:00:00을 기준으로 객체의 시간까지 경과된 밀리초를 반환한다.

15. Date.prototype.setTime: 시간을 설정한다.

16. Date.prototype.getTimezoneOffset: UTC와 locale 시간의 차이를 분단위로 반환한다.

17. Date.prototype.toDateString/toTimeString/toISOString: Date 객체를 사람이 읽을 수 있는 형식의 문자열로 반환한다.

18. Date.prototype.toLocaleString/toLocaleTimeString(local): local에 전달한 나라 기준으로 시간 표현해줌.

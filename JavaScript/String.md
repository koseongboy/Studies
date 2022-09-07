# String

## 1. String 메소드

문자열은 변경 불가능한 원시 값이기 때문에 String 메소드도 문자열을 직접 변경하진 않고 바뀐 문자열을 반환하는 형태이다.

1. String.prototype.indexOf(String, startIndex): 인수로 받은 문자열을 검색해서 해당 문자열의 위치를 반환, 없으면 -1반환. 두 번째 인수로 검색을 시작할 인덱스를 전달할 수 있다.

2. String.prototype.search(RegExp): 전달받은 정규식을 찾아 정규식이 위치하는 인덱스를 반환한다. 없을 시 -1 반환

3. String.prototpye.includes(String, startIndex): 해당 문자열이 존재하는 지 확인하여 불타입 반환. 둘째 인수로 검색을 시작할 인덱스를 지정할 수 있음.

4. String.prototype.startsWith(String, startIndex): 인수로 전달받은 문자열로 시작하는 지 확인. 둘째 인수로 검색을 시작할 인덱스를 지정할 수 있음.

5. String.prototype.endsWith(String, length): 대상 문자열이 인수로 받은 문자열로 끝나는 지 검사한다. 둘째 인수로 대상 문자열의 길이를 조절할 수 있다

6. String.prototype.charAt(index): 해당 인덱스가 어떤 문자인지 반환한다. 범위를 벗어날 경우 빈 문자 반환.

7. String.prototype.substring(start, end): start인덱스부터 end인덱스 전까지의 문자열을 반환한다. 음수가 전달될 경우 0으로 인식한다.

8. String.prototype.slice(start, end): substring과 같지만 인덱스로 음수를 전달할 수 있다.

9. String.prototype.toUpperCase/toLowerCase: 대문자로/소문자로

10. String.prototype.trim: 앞뒤에 공백이 있다면 이를 제거한 문자열을 반환한다.

11. String.prototype.repeat(n): 문자열을 n번만큼 반복한 문자열을 반환한다.

12. String.prototype.replace(String|RegExp, String|Callback func(첫 인수로 전달된 문자열)): 첫 인수로 전달된 문자열 혹은 정규식에 부합하는 문자열을 둘째 인수의 문자열 혹은 둘째 인수의 콜백 함수의 반환값 로 바꾼 문자열을 반환한다.

13. String.prototype.split(String|RegExp, arrayLength): 인수로 전달된 문자열 혹은 정규식을 기준으로 문자를 나눈 배열을 반환한다. 둘째 인수로 반환할 배열의 길이를 지정할 수 있다.

# 디스트럭칭 할당

## 1. 배열 디스트럭처링 할당

```javascript
const arr = [1, 2, 3];

const [one, two, three] = arr; // 1, 2, 3

const [a, b] = [1, 2, 3]; //1, 2

const [a, , b] = [1, 2, 3]; //1, 3

const [a, b, c = 3] = [1, 2]; // 1, 2, 3

const [x, ...y] = [1, 2, 3]; // 1, [2, 3]
```

## 2. 객체 디스트럭팅 할당

```javascript
const user = { firstName: "Seonghyeon", lastName: "Ko" };
const { lastName, firstName } = user; //프로퍼티 이름이 같아야함(대신 순서 바꾸기 가능)
const { firstName: fN, lastName: lN } = user; //프로퍼티 당 이름 설정 가능

const todo = { id: 1, content: "HTML", completed: true };

const { id } = todo; //id만 추출
```

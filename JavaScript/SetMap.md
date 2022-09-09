# Set과 Map

## 1. Set

Set 객체는 중복되지 않는 값들의 집합이다. 요소에 순서가 없고 따라서 인덱스로 접근할 수 없다는 특징이 있다.

### 1. 생성

Set 생성자 함수를 호출하여 생성한다. 인수로 이터러블 객체를 받는다.

```javascript
const set = new Set([1, 2, 3, 4]);
```

중복을 허용하지 않는 Set의 특성 때문에 배열에서 중복된 요소를 삭제할 수 있다.

### 2. 요소 개수 확인

Set.prototype.size 프로퍼티를 활용한다. size 프로퍼티는 배열의 length와는 달리 setter 함수가 없어서 수정이 불가하다.

```javascript
const { size } = new Set([1, 2, 3, 3]); //3
```

### 3. 요소 추가

Set.prototype.add 메소드를 활용한다.  
add 메소드는 수정된 값을 반환하기 때문에 연속적으로 사용할 수 있고, 중복을 허용하지 않는 Set의 특성상 중복된 값을 add할 경우 오류가 발생하지 않고 무시된다.

```javascript
const set = new Set();
set.add(1).add(2).add(3);
```

비교 연산자를 사용해 두 NaN을 비교했을 때는 다르다고 나오지만 Set의 경우 NaN을 같다 평가하기 때문에 중복 추가를 허용하지 않는다. +0과 -0의 경우도 마찬가지이다.

```javascript
const set = new Set();
set.add(NaN).add(NaN); //Set (1) { NaN }
```

### 4. 요소 존재 여부 확인

Set.prototype.has 메소드를 사용한다. 특정 요소가 있으면 true, 없으면 false를 반환한다.

### 5. 요소 삭제

Set.prototype.delete 메소드를 사용한다. 인덱스가 아니라 요소 값을 전달해야한다.

```javascript
const set = new Set([1, 2, 3, 4]);
set.delete(2); //Set (3) { 1, 3, 4 }
```

만약 존재하지 않는 요소를 삭제하여도 오류는 발생하지 않는다. 그러나 delete메소드는 삭제 성공 여부에 따른 boolean값을 반환한다.

### 6. 요소 일괄 삭제

Set.prototype.clear 메소드를 사용한다. clear 메소드는 언제나 undefined를 반환한다.

### 7. 요소 순회

Set.prototype.forEach 메소드를 사용한다. 이때 콜백 함수에 전달되는 인수는 세 개가 있다.

1. 첫째 인수: 현재 순회중인 요소값
2. 둘째 인수: 현재 순회중인 요소값(첫쨰와 같음, 다른 자료구조에선 인덱스를 전달받는 부분이며 형식을 맞추기 위함.)
3. 셋째 인수: 현재 순회중인 Set 자체

Set은 이터러블이기에 for...of문으로도 순회할 수 있으며, 스프레드 문법, 디스트럭쳐링 할당도 가능하다.

```javascript
const set = new Set([1, 2, 3]);

for (const value of set) {
  console.log(value); //1 2 3
}

console.log([...set]); //[1, 2, 3]

const [a, ...rest] = set;

console.log(a, rest); //1, [2, 3]
```

### 8. 집합 연산

1. 교집합:

```javascript
//교집합 구현
Set.prototype.interSection = function (set) {
  return new Set([...this].filter((v) => set.has(v)));
};
```

2. 합집합:

```javascript
//합집합 구현
Set.prototype.union = function (set) {
  return new Set([...this, ...set]);
};
```

3. 차집합

```javascript
//차집합 구현
Set.prototype.difference = function (set) {
  return new Set([...this].filter((v) => !set.has(v)));
};
```

4. 부분 집합

```javascript
//부분 집합 구현
Set.prototype.isSuperset = function (subSet) {
  const superSetArr = [...this];
  return [...subSet].every((v) => superSetArr.includes(v));
};
```

## 2. Map

Map 객체는 키와 값의 쌍으로 이루어진 자료구조이다. Map은 객체와 유사하지만 차이점이 있다.

1. 객체는 키의 값으로 문자열이나 심볼 값만을 사용할 수 있지만 Map은 객체를 포함한 모든 값을 키로 사용할 수 있다.
2. 객체는 이터러블이 아니지만 Map은 이터러블이다.
3. 요소 개수를 확인할 때 객체는 Object.keys(obj).length로 확인하지만 Map은 Map.size로 확인한다.

### 1. 생성

생성자 함수에 인수로 이터러블을 전달하면 된다. 이때 이터러블은 키와 벨류로 구성되어있어야 한다.

```javascript
const map = new Map(["key1", "value1"], ["key2", "value2"]); // Map(2) { "key1" => "value1", "key2" => "value2" }
```

만약 충복된 키를 가지는 값이 있다면 덮어씌운다.

### 2. 요소 개수 확인

Map.prototype.size 프로퍼티를 사용한다. Set과 마찬가지로 수정 불가능하다.

### 3. 요소 추가

Map.prototype.set 메소드를 사용한다. 이또한 마찬가지로 연속으로 호출할 수 있다.

```javascript
const map = new Map();
map.set("key1", "value1").set("key2", "value2");
```

Set과 같이 NaN, +0과 -0을 같은 값으로 취급하여 동일 키로 평가하고, 벨류를 덮어쓴다.

### 4. 요소 취득

Map.prototype.get 메소드를 사용한다. 인수로 key를 전달하면 해당 키를 갖는 벨류를 반환한다. 존재하지 않을 경우 undefined를 반환한다.

### 5. 요소 존재 여부 확인

Map.prototype.has 메소드를 사용한다.

### 6. 요소 삭제

Map.prototype.delete 메소드를 사용한다. 존재하지 않는 키를 delete메소드의 인수로 전달해도 오류는 없지만 Set과 마찬가지로 삭제 성공 여부에 따른 boolean 값을 반환한다.

### 7. 요소 일괄 삭제

Map.prototype.clear 메소드를 사용한다.

### 8. 요소 순회

Map.prototype.forEach 메소드를 사용한다. forEach메소드의 콜백함수의 인수로는 세 가지가 전달된다.

1. 순회중인 요소의 value
2. 순회중인 요소의 key
3. 순회중인 Map 그 자체

Map은 이터러블이기 때문에 for...of문, 스프레드문법, 디스트럭쳐링 할당이 가능하다.

```javascript
const lee = { name: "lee" };
const kim = { name: "kim" };

const map = new Map([lee, "developer"], [kim, "designer"]);

for (const entry of map) {
  console.log(entry); //[{ name: "lee" }, "developer"]  [{ name: "kim" }, "designer"]
}

console.log([...map]); //[{ name: "lee" }, "developer"]  [{ name: "kim" }, "designer"]

const [a, b] = map;
console.log(a); //[{ name: "lee" }, "developer"]
```

Map 객체는 이터러블이면서 이터레이터인 객체를 반환하는 함수를 제공한다.

1. Map.prototype.keys
2. Map.prototype.values
3. Map.prototype.entries

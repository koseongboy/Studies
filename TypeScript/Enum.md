# Enum 타입

enum과 enum 안에 있는 아이템은 각각 타입으로 사용될 수 있다. 아이템은 값으로도 사용 가능하다.

```typescript
enum Fruit {
  Apple,
  Banana,
  Orange,
}
const v1: Fruit = Fruit.Apple;
const v2: Fruit.Apple | Fruit.Banana = Fruit.Banana;
```

아이템에 명시적으로 값을 입력하지 않으면 0부터 시작해서 1씩 늘어나고, 값을 입력하면 해당 값이 된다. 값을 입력 원소의 다음 원소는 이전에 입력한 값에서 1씩 늘어난다.

```typescript
enum Fruit {
  Apple, //0
  Banana = 5,
  Orange, //6
}
```

enum의 아이템들은 이름과 값이 양방향으로 매핑이 된다.

```typescript
enum Fruit {
  Apple, //0
  Banana = 5,
  Orange, //6
}

console.log(Fruit.Banana); //5
console.log(Fruit["Banana"]); //5
console.log(Fruit[5]); //Banana
```

enum의 원소에는 문자열도 할당할 수 있다. 이때는 아이템이 단방향으로 매핑된다.

```typescript
enum Language {
  Korea = "ko",
  Japan = "jp",
  US = "en",
}
```

enum의 경우 js로 컴파일했을 때 불필요하게 객체의 크기를 남길 수 있다. 따라서 enum 앞에 const 키워드를 붙이면 컴파일할 때 enum을 구현한 객체를 생성하지 않는다.
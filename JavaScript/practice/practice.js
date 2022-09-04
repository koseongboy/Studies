const base = {
  name: "Lee",
  sayHi: function () {
    return "Hi!";
  },
};

const derived = {
  __proto__: base,
  sayHi() {
    return `${super.sayHi()} How are you doing?`;
  },
};

console.log(derived.sayHi());

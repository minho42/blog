---
title: JavaScript this
date: "2023-09-06"
---

## `this` inside callback to forEach

```js
class Counter {
  constructor() {
    this.sum = 0
  }

  add(arr) {
    arr.forEach(function (item) {
      this.sum += item // <-- (this === undefined)
    })
  }

  show() {
    console.log(this.sum)
  }
}

const counter = new Counter()
counter.add([1, 2, 3])
counter.show()
```

`add` function above will cause following TypeError as `this` inside the anonymous callback function is undefined.

```shell
TypeError: Cannot read properties of undefined (reading 'sum')
```

This is because the callback function passed to forEach **creates its own scope**.
It makes `this` inside the callback (`this` === undefined) and outside the callback (`this` has access to sum: this.sum) different.

How to fix (bind) `this` to callback function inside forEach:

### Fix 1: optional argument to forEach

```js
add(arr) {
  arr.forEach(function (item) {
    this.sum += item
  }, this) // <--
}
```

[Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

> #### Syntax
>
> forEach(callbackFn, **thisArg**)
>
> thisArg (Optional): A value to use as `this` when executing callbackFn.

### Fix 2: closure

```js
add(arr) {
  const that = this // <--
  arr.forEach(function (item) {
    that.sum += item // <-- that, not this
  })
}
```

[Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

Lexical context has changed inside the callback function.
The callback function still has access to variables in their enclosing scope (`add(){...}`) throuth closure.

- `add` has access to `this`
- callback doesn't have direct access to `this`
- but callback has access to variables inside `add`
- copy `this` inside `add` so callback can access `this`

### Fix 3: bind

```js
add(arr) {
  arr.forEach(
    function (item) {
      this.sum += item
    }.bind(this) // <--
  )
}
```

[Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)

Explicitly set the value of `this` within the callback function.

> #### [Excerpt from mdn: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
>
> The bind() method can set the value of a function's this regardless of how it's called.

### Fix 4: arrow function

```js
add(arr) {
  arr.forEach((item) => {
    this.sum += item;
  });
}
```

> #### [Excerpt from mdn: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
>
> Arrow functions don't provide their own this binding (it retains the this value of the enclosing lexical context).

# Typist

[![Build Status](https://travis-ci.org/scttdavs/typist.svg?branch=master)](https://travis-ci.org/scttdavs/typist)
[![Coverage Status](https://coveralls.io/repos/github/scttdavs/typist/badge.svg?branch=master)](https://coveralls.io/github/scttdavs/typist?branch=master)

Type check function return values at run time, or type check any value any time.

1. [All In One Example](#all-in-one-example)
1. [Return Values](#return-values)
1. [Any Value](#any-value)

## All in one example

Seamlessly type check the return type as well as input types for the life of the function.

```js
var makeArray = type.returns(Array).takes(Array, String, Number).definition(function(input, foo, bar) {
  input.push(foo, bar);
  return input;
});

makeArray([], "1", 2); // ["1", 2]
makeArray([], 1, 2); // Throws TypistError
```

Or you can use the features separately but all together for the same effect.

```js
var type = require("typist");

var makeArray = type(Array, function(input, foo, bar) {
  type.checks([Array, input], [String, foo], [Number, bar]);
  input.push(foo, bar);
  return input;
});

makeArray([], 1, 2); // throws TypistError
makeArray([], "1", 2); // ["1", 2]
```

## Return Values

Typist creates a curried function of your type and will check against that type any time a value is returned from it. Ensure your function will always return what you expect it to.

```js
var type = require("typist");

var makeArray = type(Array, function(input) {
  return input.push("Foo");
});

makeArray("string"); // throws TypistError
makeArray([]); // ["Foo"]
```

## Any Value

Type check any value any time

```js
var type = require("typist");

type.is.array(["Foo"]); // true
type.is.string(["Bar"]); // false

type.array(["Foo"]); // ["Foo"]
type.array("Bar"); // throws TypistError
```

You can also type check many values, which is useful for checking all your function arguments at the top of the function.

```js
var type = require("typist");

var makeArray = function(input, foo, bar) {
  type.checks([Array, input], [String, foo], [Number, bar]);
  input.push(foo, bar);
  return input;
});

makeArray([], 1, 2); // throws TypistError
makeArray([], "1", 2); // ["1", 2]
```


## Currently Supporting

I'm adding more types as I have time, but currently have:

- Array
- String
- Number
- Function
- Boolean
- Date

## Testing

You will need to install `grunt-cli` if you haven't already.
Run `grunt test` to run tests and coverage. Coverage is saved in `coverage` folder.

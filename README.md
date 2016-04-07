# Typist

Type check function return values at run time, or type check any value any time.

## Type Check Function Return Values

Typist creates a curried function of your type and will check against that type any time a value is returned from it. Ensure your function will always return what you expect it to.

```js
var type = require("typist");

var makeArray = type(Array, function(input) {
  return input.push("Foo");
});

makeArray("string"); // throws TypistError
makeArray([]); // ["Foo"]
```

## Type Checking

Type check any value any time

```js
var type = require("typist");

type.is.array(["Foo"]); // true
type.is.string(["Bar"]); // false

type.array(["Foo"]); // ["Foo"]
type.array("Bar"); // throws TypistError
```

## Currently Supporting

I'm adding more types as I have time, but currently have:

- Array
- String

## Testing

You will need to install `grunt-cli` if you haven't already.
Run `grunt test` to run tests and coverage. Coverage is saved in `coverage` folder.

# Typist

Type check function return values at run time, or type check any value any time.

## Type Check Function Return Values

Typist creates a curried function of your type and will check against that type any time a value is returned from it. Ensure your function will always return what you expect it to.

```js
var typist = require("typist");

var makeArray = typist(Array, function(input) {
  return input.push("Foo");
});

makeArray("string"); // throws TypistError
makeArray([]); // ["Foo"]
```

## Type Checking

Type check any value any time

```js
var typist = require("typist");

typist.is.array(["Foo"]); // true
typist.is.string(["Bar"]); // false

typist.array(["Foo"]); // ["Foo"]
typist.array("Bar"); // throws TypistError
```

## Currently Supporting

I'm adding more types as I have time, but currently have:

- Array
- String

## Testing

You will need to install `grunt-cli` if you haven't already.
Run `grunt test` to run tests and coverage. Coverage is saved in `coverage` folder.

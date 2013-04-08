# Array Series [![Build Status](https://travis-ci.org/jonathanong/array-parallel.png)](https://travis-ci.org/jonathanong/array-parallel)

Call an array of asynchronous functions in parallel

### API

#### parallel(fns[, context[, callback]])

```js
var parallel = require('array-parallel')

parallel([
  function (done) {
    done()
  }
], this, function (err) {

})
```

#### fns

`fns` is an array of functions to call in series.
The argument signature should be:

```js
function (done) {
  done(new Error())
  // or
  done(null, result)
}
```

That is, each function should only take a `done` as an argument.
Each callback should only take an `Error` as the first argument,
or a value as the second.

#### context

Optional context to pass to each `fn`.
Basically `fn.call(context, done)`.

#### callback(err, results)

```js
function (err, results) {

}
```

Only argument is an `Error` argument.
It will be the first error retrieved from all the `fns`.
`results` will be an array of results from each `fn`,
thus this could be considered an asynchronous version of `[].map`.

### License

WTFPL
module.exports = function parallel(fns, context, callback) {
  if (!callback && typeof context === 'function') {
    callback = context
    content = null
  }

  if (!callback) {
    callback = noop
  }

  var pending = fns.length
  var finished = false
  var results = new Array(pending)

  fns.forEach(context ? function (fn, i) {
    fn.call(context, maybeDone(i))
  } : function (fn) {
    fn(maybeDone(i))
  })

  function maybeDone(i) {
    return function (err, result) {
      if (finished) return;

      if (err) {
        callback(err, results)
        finished = true
        return
      }

      results[i] = result

      if (--pending) return;

      callback(null, results)
      finished = true
    }
  }
}

function noop() {}
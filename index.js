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

  fns.forEach(context ? function (fn) {
    fn.call(context, maybeDone)
  } : function (fn) {
    fn(maybeDone)
  })

  function maybeDone(err) {
    if (!finished && (err || !--pending)) {
      callback(err)
      finished = true
    }
  }
}

function noop() {}
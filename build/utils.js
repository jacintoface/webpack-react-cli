const path = require('path')
exports.resolve = (...route) => {
  return path.join.apply(null, [__dirname, '../src', ...route])
}
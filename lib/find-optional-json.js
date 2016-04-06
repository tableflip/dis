module.exports = function findOptionalJson (filepath) {
  var obj = {}
  try {
    obj = require(filepath)
  } catch (e) {
    // is ok.
  }
  return obj
}

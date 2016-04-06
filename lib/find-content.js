var path = require('path')
var findOptionalJson = require('./find-optional-json')

module.exports = function findContent (tplFile) {
  var contentFilepath = path.join(path.dirname(tplFile), 'content.json')
  return findOptionalJson(contentFilepath)
}

var path = require('path')
var findOptionalJson = require('./find-optional-json')

module.exports = function findContent (baseDir) {
  var contentFilepath = path.join(baseDir, 'content.json')
  console.log(contentFilepath)
  return findOptionalJson(contentFilepath)
}

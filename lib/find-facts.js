var path = require('path')
var findOptionalJson = require('./find-optional-json')

module.exports = function findFacts (baseDir) {
  var factsFilepath = path.join(baseDir, 'facts.json')
  return findOptionalJson(factsFilepath)
}

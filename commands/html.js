/*
 * I find all the index.jade or index.jade files in the /pages dir and render
 * them to the /dist directory.
 *
 * `home` is assumed to be the root, and is pulled up to `/dist/index.html`.
 */
var fs = require('fs')
var path = require('path')
var find = require('find')
var jade = require('jade')
var async = require('async')
var mkdirp = require('mkdirp')
var findFacts = require('../lib/find-facts')
var findContent = require('../lib/find-content')

// TODO: BYO helper functions.
var md = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true
})
// TODO: this is here for backwards compat. Again, todo: BYO helper functions.
var toSlug = function (string) {
  string = string.toString()
  return string.toLowerCase().split(' ').join('-')
}

// Find all the jades, render them and write them to `/dist`
module.exports = function () {
  var start = Date.now()
  var baseDir = process.cwd()
  var inputDir = path.join(baseDir, 'pages')
  var outputDir = path.join(baseDir, 'dist')
  var facts = findFacts(baseDir)

  findTemplates(inputDir, (err, files) => {
    if (err) return console.error(err)
    // Build a task list from the list of templates we find.
    var tasks = files.map((tpl) => {
      var name = path.dirname(path.relative(inputDir, tpl))
      return {
        name: name,
        input: tpl,
        output: path.join(outputDir, name, 'index.html'),
        meta: { relativePathToRoot: '..' }
      }
    })

    // shift output of `home` to `./dist`
    tasks
      .filter((task) => task.name === 'home')
      .forEach((task) => {
        task.output = path.join(outputDir, 'index.html')
        task.meta.relativePathToRoot = '.'
      })

    // render all the jades
    tasks.forEach((task) => {
      var locals = {
        meta: task.meta,
        facts: facts,
        content: findContent(path.dirname(task.input)),
        md: md,
        toSlug: toSlug,
        pretty: true
      }
      task.html = jade.renderFile(task.input, locals)
    })

    // All jades are ok. Start writing files.
    async.each(tasks, writeFile, () => {
      if (err) return console.error(err)
      console.log('Compiled %s templates in %sms', tasks.length, Date.now() - start)
    })
  })
}

function findTemplates (inputDir, done) {
  find.file(/\index.(jade|jade)$/, inputDir, (files) => {
    return done(null, files) // TODO: stop using find, it's weird.
  })
}

function writeFile (task, done) {
  mkdirp(path.dirname(task.output), () => {
    fs.writeFile(task.output, task.html, {encoding: 'utf8'}, done)
  })
}

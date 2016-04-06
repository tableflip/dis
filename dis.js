#!/usr/bin/env node

var yargs = require('yargs')
var commands = require('./commands')

// build the cli inteface with yargs: http://yargs.js.org/
yargs
  .usage('Usage: $0 <command> [options]')
  .command('css', 'Compile the `./pages/main.scss` file; output the css to the stdout', {}, commands.css)
  .alias('sass', 'css')
  .alias('scss', 'css')
  .command('html', 'Compile jade templates named `index.jade` in `./pages` with their `content.json` file and write resulting html to the `./dist` directory.', {}, commands.html)
  .alias('pug', 'html')
  .alias('jade', 'html')
  .argv

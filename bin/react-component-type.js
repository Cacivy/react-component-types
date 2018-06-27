#!/usr/bin/env node

const program = require('commander');
const parse = require('../src/parse')

program
  .command('parse <dir>', 'A component or directory')
  .option('-o, --output', 'output path')
  .action(function (dir, cmd) {
    parse(dir)
  })

program.parse(process.argv)

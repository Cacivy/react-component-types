#!/usr/bin/env node

const program = require('commander');
const fs = require('fs')
const path = require('path')
const parse = require('../parse')

program
  .command('parse <dir>', 'A component or directory')
  .option('-o, --output', 'output path')
  .option('-c, --cover', 'Whether to cover it when it exists')
  .option('-d, --directory', 'parse child directory')
  .action(function (dir, cmd) {
    const res = fs.statSync(dir)
    const parseWithCmd = parse.bind(null, cmd)
    if (res.isFile() || !cmd.directory) {
      parseWithCmd(dir)
    } else if (res.isDirectory()) {
      const items = fs.readdirSync(dir)
      items.forEach(item => {
        const itemDir = path.resolve(dir, item)
        if(fs.statSync(itemDir).isFile()) {
          const extname = path.extname(item)
          if (['.js', '.jsx'].includes(extname)){
            parseWithCmd(itemDir)
          }
        } else {
          const index = path.resolve(itemDir, 'index.js')
          if(fs.existsSync(index)) {
            parseWithCmd(index)
          }
        }
      })
    } else {
      console.error('param must be a file or directory');
    }
  })

program.parse(process.argv)

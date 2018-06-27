var program = require('commander');

program
  .command('parse <dir>', 'A component or directory')
  .option('-o, --output', 'output path')
  .action(function (dir, cmd) {
    console.log('parse ' + dir + (cmd.output ? ' output' : ''))
  })

program.parse(process.argv)

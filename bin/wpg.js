#!/usr/bin/env node

(function init() {
  const { Command } = require('commander');

  const programn = new Command();

  programn.name('wpg').version('0.0.1').usage('<command> [options]');

  programn
    .command('test')
    .description('Test command')
    .argument('[string]', 'string to test', 'default')
    .action((str) => {
      console.log(`Test command: ${str}`);
    });

  programn.parse(process.argv);
})();

import { init } from './commands/init.js';

function setInitCommand(program = {}) {
  program
    .command('init')
    .description('Initialize a new project')
    .argument('<project-name>')
    .option('-f, --skipped-folder', 'does not create folder')
    .action((name, options, command) => init({
      name,
      options,
      command
    }));
}

export { setInitCommand };

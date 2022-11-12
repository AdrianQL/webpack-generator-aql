import { init } from './commands/init.js';

function setInitCommand(program = {}) {
  program
    .command('init')
    .description('Initialize a new project')
    .argument('<project-name>')
    .action(init);
}

export { setInitCommand };

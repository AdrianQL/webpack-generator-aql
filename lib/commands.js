import { init } from './commands/init.js';

function setInitCommand(program = {}) {
  program
    .command('init')
    .description('initialize a new webpack project')
    .summary('create a new webpack project')
    .argument('[project-name]', '[OPTIONAL] Name of the project', 'webpack-aql-project')
    .option('-f, --skipped-folder', 'does not create folder')
    .option('-l, --launch', 'project auto launch')
    .option('-i, --info', 'info about the project')
    .action((name, options, command) => init({
      name,
      options,
      command
    }));

  program.addHelpText('after', `
Example call:
  $ wpg init project-name`);
}

export { setInitCommand };

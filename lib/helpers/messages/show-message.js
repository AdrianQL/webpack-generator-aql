import dree from 'dree';
import chalk from 'chalk';
import logSymbols from 'log-symbols';

import { STATUS_MESSAGES } from '../../enum/enums.js';

function showMessage(message, type, ignoreExit = false) {
  switch (type) {
    case 'error':
      console.log(logSymbols.error, chalk.red(message));
      break;
    case 'success':
      console.log(logSymbols.success, chalk.green(message));
      break;
    case 'warning':
      console.log(logSymbols.warning, chalk.yellow(message));
      break;
    default:
      console.log(logSymbols.info, chalk.blue(message));
      break;
  }
  if (!ignoreExit) {
    process.exit(1);
  }
}

function showMsgError(message, ignoreExit = false) {
  showMessage(message, 'error', ignoreExit);
}

function showMsgSuccess(message, exit = false) {
  showMessage(message, 'success', !exit);
}

function showMsgWarning(message, ignoreExit = false) {
  showMessage(message, 'warning', ignoreExit);
}

function showMsgInfo(message) {
  showMessage(message, 'info', true);
}

function showInfoProject() {
  console.log(chalk.cyan('Project information:'));
  console.log(chalk.cyan.italic('  - Name: ') + chalk.cyan.bold('webpack-aql-project'));
  console.log(chalk.cyan.italic('  - Description: ') + chalk.cyan.bold('A webpack project with a simple configuration'));
  console.log(chalk.cyan.italic('  - Author: ') + chalk.cyan.bold('Adrián Quesada López'));
  console.log(chalk.cyan.italic('  - Dependencies:'));
  console.log(chalk.cyan.bold('     * webpack'));
  console.log(chalk.cyan.bold('     * webpack-cli'));
  console.log(chalk.cyan.bold('     * webpack-dev-server'));
  console.log(chalk.cyan.bold('     * html-webpack-plugin'));
  console.log(chalk.cyan.bold('     * babel-loader'));
  console.log(chalk.cyan.bold('     * @babel/core'));
  console.log(chalk.cyan.bold('     * @babel/preset-env'));
  console.log(chalk.cyan.italic('  - Scripts:'));
  console.log(chalk.cyan.bold('     * dev'));
  console.log(chalk.cyan.bold('     * watch'));
  console.log(chalk.cyan.bold('     * build') + '\n');
}

function showStructureMessage(dir) {
  console.log('\n' + chalk.cyan(STATUS_MESSAGES.STRUCTURE_GENERATED));
  console.log(chalk.cyan.italic(dree.parse(dir, {
    exclude: /node_modules/
  })) + '\n');
}

function showStepsMessage(nameFolder) {
  console.log(logSymbols.info, chalk.blue('Next steps:'));
  if (nameFolder) {
    console.log(chalk.white.italic(`cd ${nameFolder}`));
  }
  console.log(chalk.white.italic('npm run dev'));
  console.log(chalk.white.italic('npm run watch'));
  console.log(chalk.white.italic('npm run build'));
}

function showHaveANiceDayMessage(exit = true) {
  console.log('\n' + chalk.green('Have a nice day! ;)'));
  if (exit) {
    process.exit(1);
  }
}

export {
  showHaveANiceDayMessage,
  showInfoProject,
  showMsgError,
  showMsgInfo,
  showMsgSuccess,
  showMsgWarning,
  showStepsMessage,
  showStructureMessage
};

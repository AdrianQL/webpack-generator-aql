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

function showHaveANiceDayMessage() {
  console.log('\n' + chalk.green('Have a nice day! ;)'));
  process.exit(1);
}

export { showMsgError, showMsgInfo, showMsgSuccess, showMsgWarning, showStructureMessage, showStepsMessage, showHaveANiceDayMessage };

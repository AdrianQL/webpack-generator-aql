import chalk from 'chalk';
import logSymbols from 'log-symbols';

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

export {
  showMsgError,
  showMsgInfo,
  showMsgSuccess,
  showMsgWarning,
};
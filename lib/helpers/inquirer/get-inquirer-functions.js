import chalk from 'chalk';
import inquirer from 'inquirer';
import {TYPES, COLORS} from './inquirer-enum.js';

async function generateInquirer({
  choices,
  colorFailMessage,
  defaultValue,
  failMessage,
  filter,
  ignoreExit,
  message,
  transformer,
  type,
  validate,
}) {
  if (!type || !Object.values(TYPES).includes(type)) {
    return;
  }

  const {result} = await inquirer.prompt([{
    choices,
    default: defaultValue,
    filter,
    message: message || '',
    name: 'result',
    transformer,
    type,
    validate,
  }]);

  if (!result) {
    if (failMessage) {
      colorFailMessage = Object.values(COLORS).includes(colorFailMessage) ? colorFailMessage : 'red';
      console.log(chalk[colorFailMessage](`\n${failMessage}`));
    }
    if (!ignoreExit) {
      process.exit(1);
    }
  }

  return result;
}

export {
  generateInquirer,
  TYPES,
  COLORS,
};

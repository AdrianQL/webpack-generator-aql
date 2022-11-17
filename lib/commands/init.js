import ora from 'ora';


import { showIntro } from '../helpers/messages/show-intro.js';
import {showMsgInfo} from '../helpers/messages/show-message.js';

import DirectoryFunctions from '../models/directory.model.js';

import { STATUS_MESSAGES } from '../enum/enums.js';

import execPromise from '../helpers/exec-promise.js';

//COMMAND_INIT

async function init(nameFolder) {
  showIntro();

  showMsgInfo(STATUS_MESSAGES.COMMAND_INIT);

  const directory = new DirectoryFunctions({ nameFolder, path: process.cwd() });

  const responseCreateDirectory = await directory.createDirectory();

  if (!responseCreateDirectory) {
    return;
  }

  const npmInitSpinner = ora(STATUS_MESSAGES.INITIALIZING_PROJECT);
  npmInitSpinner.start();
  await execPromise(`cd ${directory.name} && npm init -y`);
  npmInitSpinner.stop();
}

export { init };

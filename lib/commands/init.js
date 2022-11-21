import { showIntro } from '../helpers/messages/show-intro.js';
import {
  showMsgInfo,
  showMsgSuccess,
  showStepsMessage,
  showStructureMessage,
  showHaveANiceDayMessage
} from '../helpers/messages/show-message.js';
import { STATUS_MESSAGES } from '../enum/enums.js';

import DirectoryModel from '../models/directory.model.js';
import PackageModulesModel from '../models/package-module.model.js';

async function init({
  name,
  options,
  command
}) {
  showIntro();

  showMsgInfo(STATUS_MESSAGES.COMMAND_INIT);

  const directory = new DirectoryModel({
    nameFolder: name,
    processPath: process.cwd(),
    skippedFolder: options?.skippedFolder
  });

  const responseCreateDirectory = await directory.createDirectory();

  if (!responseCreateDirectory) {
    return;
  }

  const packageModules = new PackageModulesModel({
    directoryName: directory.getName(),
    directoryPath: directory.getDirectoryPath(),
    processPath: directory.processPath
  });

  await packageModules.initializePackage();
  await packageModules.installDependencies();

  await directory.copyTemplateFiles();

  showMsgSuccess(STATUS_MESSAGES.PROJECT_SUCCESSFULLY_GENERATED);
  showStructureMessage(directory.getDreeDirectory());
  showStepsMessage(directory.getDreeDirectory());
  showHaveANiceDayMessage();
}

export { init };

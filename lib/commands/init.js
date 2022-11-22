import { showIntro } from '../helpers/messages/show-intro.js';
import {
  showHaveANiceDayMessage,
  showInfoProject,
  showMsgError,
  showMsgInfo,
  showMsgSuccess,
  showStepsMessage,
  showStructureMessage
} from '../helpers/messages/show-message.js';
import { STATUS_MESSAGES } from '../enum/enums.js';

import DirectoryModel from '../models/directory.model.js';
import PackageModulesModel from '../models/package-module.model.js';

import {
  generateInquirer,
  TYPES as INQ_TYPES
} from '../helpers/inquirer/get-inquirer-functions.js';

async function init({
  name,
  options,
  command
}) {
  showIntro();

  const skippedFolder = options?.skipFolder;
  const launch = options?.launch;
  const info = options?.info;

  if (info) {
    showInfoProject();

    const response = await generateInquirer({
      type: INQ_TYPES.CONFIRM,
      message: STATUS_MESSAGES.AGREE_INSTALL_PROJECT,
      defaultValue: false,
      ignoreExit: true
    });

    if (!response) {
      showMsgError(STATUS_MESSAGES.PROCESS_CANCELLED);
      return;
    }
  }

  showMsgInfo(STATUS_MESSAGES.COMMAND_INIT);

  const directory = new DirectoryModel({
    nameFolder: name,
    processPath: process.cwd(),
    skippedFolder
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

  if (!launch) {
    showHaveANiceDayMessage();
  }

  await packageModules.launchProject();
}

export { init };

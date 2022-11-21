import ora from 'ora';
import fs from 'fs-extra';

import copyFiles from '../helpers/fs/copy-sync.js';

import {
  showMsgError,
  showMsgSuccess,
  showMsgWarning,
  showMsgInfo
} from '../helpers/messages/show-message.js';

import {
  generateInquirer,
  TYPES as INQ_TYPES
} from '../helpers/inquirer/get-inquirer-functions.js';
import { STATUS_MESSAGES } from '../enum/enums.js';

import camelcaseToDash from '../helpers/string-utils/camelcase-to-dash.js';

import { fileURLToPath } from 'url';

class DirectoryModel {
  #templateDir;
  get templateDir() {
    return this.#templateDir;
  }

  set templateDir(value) {
    const __dirname = fileURLToPath(new URL(value, import.meta.url));
    this.#templateDir = __dirname;
  }

  constructor({ nameFolder, processPath, skippedFolder }) {
    this.name = this.getName(nameFolder);
    this.processPath = processPath;
    this.directoryPath = this.getDirectoryPath();
    this.skippedFolder = skippedFolder;
    this.templateDir = '../templates/project';
    this.dreeDirectory = null;
  }

  getName(name = null) {
    if (!name || typeof name !== 'string') {
      return 'webpack-aql-project';
    }
    return camelcaseToDash(name);
  }

  getDirectoryPath() {
    if (this.skippedFolder) {
      return this.processPath;
    }
    return this.processPath + '/' + this.name;
  }

  getDreeDirectory() {
    const dir = this.getDirectoryPath();
    const splitDir = dir.split(/\\|\//);
    const name = splitDir[splitDir.length - 1];
    return (this.skippedFolder) ? ('..\\' + name) : ('.\\' + name);
  }

  /**
   * @param {*} path
   */
  async checkExitsDirectory(path = this.getDirectoryPath()) {
    return await fs.existsSync(path);
  }

  /**
   * @param {*} path
   * @returns
   */
  async createDirectory(path = this.getDirectoryPath()) {
    try {
      if (this.skippedFolder) {
        showMsgInfo(STATUS_MESSAGES.ACTIVE_SKIPPED_FOLDER);
        return true;
      }

      const exitsDirectory = await this.checkExitsDirectory(path);

      if (exitsDirectory) {
        const response = await generateInquirer({
          type: INQ_TYPES.CONFIRM,
          message: STATUS_MESSAGES.DIRECTORY_ALREADY_EXISTS_QUESTION,
          defaultValue: false,
          ignoreExit: true
        });

        if (!response) {
          showMsgWarning(STATUS_MESSAGES.DIRECTORY_OVERWRITTEN_ABORTED, true);
          showMsgError(STATUS_MESSAGES.PROCESS_CANCELLED);
          return false;
        }
        const removeSpinner = ora(STATUS_MESSAGES.DIRECTORY_OVERWRITING);
        removeSpinner.start();
        await this.removeDirectory();
        removeSpinner.stop();
      }

      await fs.mkdirSync(path);

      if (exitsDirectory) {
        showMsgSuccess(STATUS_MESSAGES.DIRECTORY_SUCCESSFULLY_OVERWRITTEN);
        return true;
      }
      return true;
    } catch (t) {
      showMsgError(t);
      return false;
    }
  }

  /**
   * @param {*} path
   * @param {*} options
   */
  async removeDirectory(path = this.getDirectoryPath(), options = { recursive: true }) {
    await fs.rmSync(path, options);
  }

  async copyTemplateFiles() {
    const copySpinner = ora(STATUS_MESSAGES.COPY_FILES);
    copySpinner.start();
    copyFiles(this.templateDir, this.getDirectoryPath(), true);
    copySpinner.stop();
  }
}

export default DirectoryModel;

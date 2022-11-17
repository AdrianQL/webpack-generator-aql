import ora from 'ora';
import fs from 'fs-extra';

import copyFiles from '../helpers/fs/copy-sync.js';

import {
  showMsgError,
  showMsgSuccess,
  showMsgWarning
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

  constructor({ nameFolder, processPath }) {
    this.name = camelcaseToDash(nameFolder);
    this.processPath = processPath;
    this.folderPath = this.processPath + '/' + this.name;
    this.templateDir = '../templates/project';
  }

  /**
   * @param {*} path
   */
  async checkExitsDirectory(path = this.folderPath) {
    return await fs.existsSync(path);
  }

  /**
   * @param {*} path
   * @returns
   */
  async createDirectory(path = this.folderPath) {
    try {
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

      const copySpinner = ora(STATUS_MESSAGES.DIRECTORY_OVERWRITING);
      copySpinner.start();
      await fs.mkdirSync(path);
      copySpinner.stop();

      if (exitsDirectory) {
        showMsgSuccess(STATUS_MESSAGES.DIRECTORY_SUCCESSFULLY_OVERWRITTEN);
        return true;
      }

      // showMsgSuccess(STATUS_MESSAGES.DIRECTORY_SUCCESSFULLY_CREATED);
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
  async removeDirectory(path = this.folderPath, options = { recursive: true }) {
    await fs.rmSync(path, options);
  }

  async copyTemplateFiles() {
    const copySpinner = ora(STATUS_MESSAGES.COPY_FILES);
    copySpinner.start();
    copyFiles(this.templateDir, this.folderPath, true);
    copySpinner.stop();
    // showMsgSuccess(STATUS_MESSAGES.FILES_COPIED);
  }
}

export default DirectoryModel;

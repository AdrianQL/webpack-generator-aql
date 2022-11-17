import fs from 'fs-extra';

import {showMsgError, showMsgSuccess, showMsgWarning} from '../helpers/messages/show-message.js';

import {generateInquirer,  TYPES as INQ_TYPES} from '../helpers/inquirer/get-inquirer-functions.js';
import { STATUS_MESSAGES } from '../enum/enums.js';

import camelcaseToDash from '../helpers/string-utils/camelcase-to-dash.js';

class DirectoryFunctions {
  constructor({ nameFolder, path }) {
    this.name = camelcaseToDash(nameFolder);
    this.path = path;
  }

  /**
   * @param {*} path 
   */
  async checkExitsDirectory(path = this.path + '/' + this.name) {
    return await fs.existsSync(path);
  }

  /**
   * @param {*} path 
   * @returns 
   */
  async createDirectory(path = this.path + '/' + this.name) {
    try {
      const exitsDirectory = await this.checkExitsDirectory(path);

      if(exitsDirectory) {
        const response = await generateInquirer({
          type: INQ_TYPES.CONFIRM,
          message: STATUS_MESSAGES.DIRECTORY_ALREADY_EXISTS_QUESTION,
          defaultValue: false,
          ignoreExit: true,
        });
  
        if (!response) {
          showMsgWarning(STATUS_MESSAGES.DIRECTORY_OVERWRITTEN_ABORTED, true);
          showMsgError(STATUS_MESSAGES.PROCESS_CANCELLED);
          return false;
        }
        await this.removeDirectory();
      }
    
      await fs.mkdirSync(path);
      
      if(exitsDirectory){
        showMsgSuccess(STATUS_MESSAGES.DIRECTORY_SUCCESSFULLY_OVERWRITTEN);
        return true;
      }
  
      showMsgSuccess(STATUS_MESSAGES.DIRECTORY_SUCCESSFULLY_CREATED);
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
  async removeDirectory(path = this.path + '/' + this.name, options = { recursive: true }) {
    await fs.rmSync(path, options)
  }
}

export default DirectoryFunctions;

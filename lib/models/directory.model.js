import fs from 'fs-extra';

import { STATUS_MESSAGES } from '../enum/enums.js';

class DirectoryFuntions {
  constructor({ nameFolder, path }) {
    this.nameFolder = nameFolder;
    this.path = path;
  }

  async checkExitsDirectory(path = this.path + '/' + this.nameFolder) {
    return await fs.existsSync(path);
  }

  async createDirectory(path = this.path + '/' + this.nameFolder) {
    if (await this.checkExitsDirectory(path)) {
      console.log(STATUS_MESSAGES.DIRECTORY_ALREADY_EXISTS);
      return;
    }
    await fs.mkdirSync(path);
    console.log(STATUS_MESSAGES.DIRECTORY_SUCCESSFULLY_CREATED);
  }

  async removeDirectory(path = this.path + '/' + this.nameFolder) {
    if (!(await this.checkExitsDirectory(path))) {
      console.log(STATUS_MESSAGES.DIRECTORY_NOT_FOUND);
      return;
    }
    await fs.rmdirSync(path);
    console.log(STATUS_MESSAGES.DIRECTORY_SUCCESSFULLY_REMOVED);
  }
}

export default DirectoryFuntions;

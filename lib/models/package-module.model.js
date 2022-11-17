import ora from 'ora';
import fs from 'fs-extra';

import { STATUS_MESSAGES } from '../enum/enums.js';
import execPromise from '../helpers/exec-promise.js';

class PackageModulesModel {

  #directoryName;
  get directoryName() {
    return this.#directoryName;
  }

  set directoryName(value) {
    this.#directoryName = value;
  }

  #folderPath;
  get folderPath() {
    return this.#folderPath;
  }

  set folderPath(value) {
    this.#folderPath = value;
  }

  #processPath;
  get processPath() {
    return this.#processPath;
  }

  set processPath(value) {
    this.#processPath = value;
  }

  constructor({
      directoryName,
      folderPath,
      processPath,
    }) {
    this.processPath = processPath;
    this.folderPath = folderPath;
    this.directoryName = directoryName;
    this.package = null;
    this.dependencies = ['webpack', 'webpack-cli', 'webpack-dev-server', 'html-webpack-plugin', 'babel-loader', '@babel/core', '@babel/preset-env'];
  }

  async initializePackage() {
    const npmInitSpinner = ora(STATUS_MESSAGES.INITIALIZING_PROJECT);
    npmInitSpinner.start();
    await execPromise(`cd ${this.#folderPath} && npm init -y`);
    npmInitSpinner.stop();
    this.setPackage();
  }

  async installDependencies() {
    const npmInstallSpinner = ora(STATUS_MESSAGES.COMMAND_INIT_INSTALL);
    npmInstallSpinner.start();
    await execPromise(`cd ${this.#folderPath} && npm i -D ${this.dependencies.join(' ')}`);
    npmInstallSpinner.stop();
  }

  async setPackage() {
    const URL = this.folderPath + '/package.json';
    const file = await fs.readFileSync(URL, 'utf8');
    this.package = JSON.parse(file);
  }

}

export default PackageModulesModel;
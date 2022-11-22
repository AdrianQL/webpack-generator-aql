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

  #directoryPath;
  get directoryPath() {
    return this.#directoryPath;
  }

  set directoryPath(value) {
    this.#directoryPath = value;
  }

  #processPath;
  get processPath() {
    return this.#processPath;
  }

  set processPath(value) {
    this.#processPath = value;
  }

  constructor({ directoryName, directoryPath, processPath }) {
    this.processPath = processPath;
    this.directoryPath = directoryPath;
    this.directoryName = directoryName;
    this.package = null;
    this.dependencies = [
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      'html-webpack-plugin',
      'babel-loader',
      '@babel/core',
      '@babel/preset-env'
    ];
  }

  async initializePackage() {
    const npmInitSpinner = ora(STATUS_MESSAGES.INITIALIZING_PROJECT);
    npmInitSpinner.start();
    await this.removeDependencies();
    await execPromise(`cd ${this.#directoryPath} && npm init -y`);
    npmInitSpinner.stop();
    this.setPackage();
  }

  async installDependencies() {
    const npmInstallSpinner = ora(STATUS_MESSAGES.COMMAND_INIT_INSTALL);
    npmInstallSpinner.start();
    await execPromise(
      `cd ${this.#directoryPath} && npm i -D ${this.dependencies.join(' ')}`
    );
    npmInstallSpinner.stop();
  }

  async setPackage() {
    const URL = this.directoryPath + '/package.json';
    const file = await fs.readFileSync(URL, 'utf8');
    this.package = JSON.parse(file);
    this.package.scripts = {
      dev: 'webpack serve --mode development',
      watch: 'webpack-dev-server --mode development --open',
      build: 'webpack --mode production'
    };
    await fs.writeFileSync(URL, JSON.stringify(this.package, null, 2));
  }

  getVersions() {
    const versions = {
      webpack: this.package.dependencies.webpack,
      webpackCli: this.package.dependencies['webpack-cli'],
      webpackDevServer: this.package.dependencies['webpack-dev-server'],
      htmlWebpackPlugin: this.package.dependencies['html-webpack-plugin'],
      babelLoader: this.package.dependencies['babel-loader'],
      babelCore: this.package.dependencies['@babel/core'],
      babelPresetEnv: this.package.dependencies['@babel/preset-env']
    };
    return versions;
  }

  async removePackage() {
    await fs.unlinkSync(this.directoryPath + '/package.json');
    await fs.unlinkSync(this.directoryPath + '/package-lock.json');
  }

  async removeDependencies() {
    await execPromise(`cd ${this.directoryPath} && npm uninstall ${this.dependencies.join(' ')}`);
  }

  async removeNodeModules() {
    await fs.removeSync(this.directoryPath + '/node_modules');
  }

  async launchProject() {
    const result = await execPromise(`cd ${this.directoryPath} && npm run watch`);
    return result;
  }
}

export default PackageModulesModel;

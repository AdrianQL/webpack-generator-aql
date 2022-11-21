import fs from 'fs-extra';

class PackageModulesModel {
  constructor() {
    this.path = this.getPath();
    this.packagePath = `${this.path}/package.json`;
    this.package = this.getPackage();
  }

  getPath() {
    return process.cwd();
  }

  async getVersion() {
    const packageModule = await this.getPackage();
    return packageModule.version;
  }

  async getAuthor() {
    const packageModule = await this.getPackage();
    return packageModule.author;
  }

  async getPackage() {
    const packageModule = await fs.readFileSync(this.packagePath, 'utf8');
    const packageJson = JSON.parse(packageModule);
    return packageJson;
  }

  async setPackage() {
    await fs.writeFileSync(this.packagePath, JSON.stringify(this.package, null, 2));
  }
}

export default PackageModulesModel;

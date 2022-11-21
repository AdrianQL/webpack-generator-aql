import fs from 'fs-extra';
import { fileURLToPath } from 'url';

class PackageModulesModel {
  constructor() {
    this.__dirname = fileURLToPath(new URL(value, import.meta.url));
    this.packagePath = `${this.__dirname}/package.json`;
    this.package = this.getPackage();
  }

  async getPackage() {
    return await fs.readFileSync(this.packagePath, 'utf8');
  }

  async setPackage() {
    await fs.writeFileSync(packagePath, JSON.stringify(this.package, null, 2));
  }
}

export default PackageModulesModel;

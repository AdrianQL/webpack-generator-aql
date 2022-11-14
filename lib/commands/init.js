import { showTitle } from '../helpers/showTitle.js';

import DirectoryFuntions from '../models/directory.model.js';

async function init(nameFolder) {
  showTitle();

  const directory = new DirectoryFuntions({ nameFolder, path: process.cwd() });

  await directory.createDirectory();
  await directory.removeDirectory();
}

export { init };

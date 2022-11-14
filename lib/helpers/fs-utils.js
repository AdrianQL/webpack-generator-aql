const fs = require('fs-extra');

function checkExitsDirectory(path = '') {
  return fs.existsSync(path);
}

function generateDirectory(path = '') {
  if (!checkExitsDirectory(path)) {
    fs.mkdirSync(path);
  }
}

export { checkExitsDirectory, generateDirectory };

import fs from 'fs-extra';

function copy(src, dest, overwrite) {
  const options = {
    errorOnExist: false,
    filter: (src, dest) => {
      const exists = fs.existsSync(dest);
      const isFile = exists && !fs.statSync(dest).isDirectory();
      if (!overwrite && isFile) {
        mkCopy(dest);
      }
      return true;
    },
    overwrite
  };
  fs.copySync(src, dest, options);
}

function mkCopy(dest) {
  const ignore = /node_modules/.test(dest);
  if (ignore) {
    return;
  }

  fs.copySync(dest, '___' + dest + '_old');
}

export default function (src, dest, overwrite) {
  copy(src, dest, overwrite);
}

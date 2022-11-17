/**
 * @param {string} myStr
 * @returns
 */
function dashToNormal(myStr) {
  return myStr.replace(/-([a-z\d])/g, (g) => ' ' + g[1]);
}

/**
 * @param {string} myStr
 * @returns
 */
function dashToNormalUpper(myStr) {
  return ('-' + myStr).replace(/-([a-z\d])/g, (g) => ' ' + g[1].toUpperCase());
}

export {
  dashToNormal,
  dashToNormalUpper,
};

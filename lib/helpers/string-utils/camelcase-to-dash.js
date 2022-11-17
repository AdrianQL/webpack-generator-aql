/**
 * @param {string} string
 * @returns
 */
function camelcaseToDash(string) {
  string = string.charAt(0).toLowerCase() + string.slice(1);
  return string.replace(/[A-Z\d]/g, (m) => '-' + m.toLowerCase());
}

export default camelcaseToDash;

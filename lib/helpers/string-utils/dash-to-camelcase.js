/**
 * @param {string} myStr
 * @returns
 */
function dashToCamelcase(myStr) {
  return myStr.replace(/-([a-z\d])/g, function(g) {
    return g[1].toUpperCase();
  });
}

export default dashToCamelcase;

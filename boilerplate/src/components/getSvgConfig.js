/** 
 * @param {string} symbolName
 * @param {Number} size
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (symbolName, size = 12) => ({
  xmlns: `http://www.w3.org/2000/svg`,
  tag: `svg`,
  id: `${symbolName}-svg`,
  width: `${size}`,
  height: `${size}`,
  class: `padded`,
  viewBox: `0 0 24 24`,
  children: [{
    xmlns: `http://www.w3.org/2000/svg`,
    tag: `use`,
    href: `#${symbolName}`,
  }]
});

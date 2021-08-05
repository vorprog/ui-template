/** 
 * @param {string} symbolName
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (symbolName, customConfig = {}) => Object.assign({
  xmlns: `http://www.w3.org/2000/svg`,
  tag: `svg`,
  id: `${symbolName}-svg`,
  width: `40`,
  height: `40`,
  class: `padded`,
  viewBox: `0 0 24 24`,
  children: [{
    xmlns: `http://www.w3.org/2000/svg`,
    tag: `use`,
    href: `#${symbolName}-symbol`,
  }]
}, customConfig);

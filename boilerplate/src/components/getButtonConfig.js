const svg = require(`./getSvgConfig`);

/**
 * @param {string} symbolName
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (symbolName, customConfig = {}) => svg(symbolName, Object.assign({
  width: 24,
  height: 24,
  class: `clickable padded curved grey-border`
}, customConfig))

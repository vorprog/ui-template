const svg = require(`./getSvgConfig`);

/**
 * @param {string} symbolName
 * @param {Number} size
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (symbolName, size = 12) => {
  const svgConfig = svg(symbolName, size);
  svgConfig.class += ` curved grey-border`
  return svgConfig;
};
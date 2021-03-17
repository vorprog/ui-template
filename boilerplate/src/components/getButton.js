const svg = require(`./getSvgConfig`);

module.exports = (symbolName, size = 12) => {
  const svgConfig = svg(symbolName, size);
  svgConfig.class += ` curved grey-border`
  return svgConfig;
};
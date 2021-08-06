const svg = require('./getSvgConfig');

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (customConfig = {}) => Object.assign({
  id: `footer`,
  class: `grey row`,
  children: [{
    children: [
      { tag: `a`, href: `https://linkedin.com/in/richardsnider`, children: [svg(`linkedin`, { fill: `#BBB` })] },
      { tag: `a`, href: `https://github.com/richardsnider`, children: [svg(`github`, { fill: `#BBB` })] },
      { textContent: `Created by Richard Snider` }
    ]
  }
  ]
}, customConfig);

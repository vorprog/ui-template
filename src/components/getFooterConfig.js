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
      { tag: `a`, href: `https://linkedin.com/in/${window.env.LINKEDIN_USERNAME}`, children: [svg(`linkedin`, { fill: `#BBB` })] },
      { tag: `a`, href: `https://github.com/${window.env.GITHUB_USERNAME}`, children: [svg(`github`, { fill: `#BBB` })] },
      { textContent: `Created by ${window.env.GITHUB_USERNAME}` }
    ]
  }
  ]
}, customConfig);

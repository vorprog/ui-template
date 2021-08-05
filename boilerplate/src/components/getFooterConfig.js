/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `footer`,
  class: `grey row`,
  children: [{
    textContent: `FOOTER`
  }]
}, customConfig);

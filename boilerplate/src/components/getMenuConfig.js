/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `menu`,
  class: `grey-333 hidden popup`,
  children: [{
    class: `grey-border padded`,
    textContent: `Section 1`
  },
  {
    class: `grey-border padded`,
    textContent: `Section 2`
  },
  {
    class: `grey-border padded`,
    textContent: `Section 3`
  }]
}, customConfig);

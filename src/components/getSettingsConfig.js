/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `settings`,
  class: `grey-333 hidden right-side popup`,
  children: [{
    class: `grey-border padded`,
    textContent: `General Settings`
  },
  {
    class: `grey-border padded`,
    textContent: `Profile`
  },
  {
    class: `grey-border padded`,
    textContent: `Log out`
  }]
}, customConfig);

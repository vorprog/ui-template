const button = require('./getButtonConfig');

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (customConfig = {}) => Object.assign({
  id: `action-buttons`,
  children: [
    button(`refresh`),
    button(`add`),
    button(`remove`),
    button(`sort-down`)
  ]
}, customConfig);
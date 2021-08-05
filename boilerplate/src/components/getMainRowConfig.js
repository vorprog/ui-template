const input = require('./getInputConfig');
const getActionButtonsConfig = require('./getActionsbuttonsConfig');

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `main-row`,
  class: `row`,
  children: [{
    id: `action-bar`,
    class: `grey-444 row`,
    children: [
      input({ id: `filter-input` }), 
      getActionButtonsConfig()
    ]
  }, {
    tag: `table`,
    id: `data-table`,
    class: `grey-222 row`
  }]
}, customConfig);

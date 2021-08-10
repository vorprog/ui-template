const input = require('./getInputConfig');
const getActionButtonsConfig = require('./getActionsbuttonsConfig');
const getBannerConfig = require('./getBannerConfig');

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
  },
  getBannerConfig(`Loading . . .`, `request-status-banner`),
  {
    tag: `table`,
    id: `data-table`,
    class: `grey-222 row`,
    children: [
      {
        tag: `thead`,
        id: `data-table-head`
      },
      {
        tag: `tbody`,
        id: `data-table-body`
      }
    ]
  }
]
}, customConfig);

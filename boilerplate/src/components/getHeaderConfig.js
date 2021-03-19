const svg = require('./getSvgConfig');

/** @returns {import('../utilities/newElement').ElementConfig} */
const getBaseHeaderConfig = () => ({
  id: `header`,
  class: `grey-666 row`,
  children: [{
    id: `left-header`,
    children: [
      svg(`menu-symbol`, 40),
      svg(`search-symbol`, 40)
    ]
  },
  {
    id: `right-header`,
    children: [
      svg(`notifications-symbol`, 40),
      svg(`settings-symbol`, 40)
    ]
  }]
});

/**
 * @param {import('../utilities/newElement').ElementConfig} params
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (params) => Object.assign(getBaseHeaderConfig(), params);

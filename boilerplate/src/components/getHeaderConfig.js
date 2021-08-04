const svg = require('./getSvgConfig');
const toggleHiddenElement = require('../actions/toggleHiddenElement');

/** @returns {import('../utilities/newElement').ElementConfig} */
const getBaseHeaderConfig = () => ({
  id: `header`,
  class: `grey-666 row`,
  children: [{
    id: `left-header`,
    children: [
      {
        id: `menu-button`,
        onclick: () => (toggleHiddenElement(`menu`)),
        children: [svg(`menu`)]
      },
      {
        onclick: () => (toggleHiddenElement(`search`)),
        children: [svg(`search`)]
      }
    ]
  },
  {
    id: `right-header`,
    children: [
      {
        onclick: () => (toggleHiddenElement(`notifications`)),
        children: [svg(`notifications`)]
      },
      {
        onclick: () => (toggleHiddenElement(`settings`)),
        children: [svg(`settings`)]
      }
    ]
  }]
});

/**
 * @param {import('../utilities/newElement').ElementConfig} params
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (params) => Object.assign(getBaseHeaderConfig(), params);

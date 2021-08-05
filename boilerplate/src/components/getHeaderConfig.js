const svg = require('./getSvgConfig');
const toggleHiddenElement = require('../actions/toggleHiddenElement');

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
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
}, customConfig);

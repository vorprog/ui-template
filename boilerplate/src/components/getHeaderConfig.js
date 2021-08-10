const svg = require('./getSvgConfig');

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
        onclick: () => document.getElementById(`menu`).classList.toggle(`hidden`),
        children: [svg(`menu`)]
      },
      {
        onclick: () => document.getElementById(`search`).classList.toggle(`hidden`),
        children: [svg(`search`)]
      }
    ]
  },
  {
    id: `right-header`,
    children: [
      {
        onclick: () => document.getElementById(`notifications`).classList.toggle(`hidden`),
        children: [svg(`notifications`)]
      },
      {
        onclick: () => document.getElementById(`settings`).classList.toggle(`hidden`),
        children: [svg(`settings`)]
      }
    ]
  }]
}, customConfig);

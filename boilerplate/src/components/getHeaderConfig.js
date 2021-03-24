const svg = require('./getSvgConfig');

window.app.actions.toggleMenu = () => {
  const menuElement = document.getElementById(`menu`);
  menuElement.classList.contains(`hidden`) ? menuElement.classList.remove(`hidden`) : menuElement.classList.add(`hidden`);
};

/** @returns {import('../utilities/newElement').ElementConfig} */
const getBaseHeaderConfig = () => ({
  id: `header`,
  class: `grey-666 row`,
  children: [{
    id: `left-header`,
    children: [
      {
        onclick: `window.app.actions.toggleMenu()`,
        children: [svg(`menu-symbol`, 40)]
      },
      {
        onclick: `window.app.actions.displaySearch()`,
        children: [svg(`search-symbol`, 40)]
      }
    ]
  },
  {
    id: `right-header`,
    children: [
      {
        onclick: `window.app.actions.displayNotifications()`,
        children: [svg(`notifications-symbol`, 40)]
      },
      {
        onclick: `window.app.actions.displaySettings()`,
        children: [svg(`settings-symbol`, 40)]
      }
    ]
  }]
});

/**
 * @param {import('../utilities/newElement').ElementConfig} params
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (params) => Object.assign(getBaseHeaderConfig(), params);

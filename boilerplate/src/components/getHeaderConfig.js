const svg = require('./getSvgConfig');
const toggleHiddenClass = require('../actions/toggleHiddenClass');

window.app.actions.toggleMenu = () => toggleHiddenClass(`menu`);
window.app.actions.toggleSearch = () => toggleHiddenClass(`search`);
window.app.actions.toggleNotifications = () => toggleHiddenClass(`notifications`);
window.app.actions.toggleSettings = () => toggleHiddenClass(`settings`);

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
        onclick: `window.app.actions.toggleSearch()`,
        children: [svg(`search-symbol`, 40)]
      }
    ]
  },
  {
    id: `right-header`,
    children: [
      {
        onclick: `window.app.actions.toggleNotifications()`,
        children: [svg(`notifications-symbol`, 40)]
      },
      {
        onclick: `window.app.actions.toggleSettings()`,
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

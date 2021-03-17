const svg = require('./getSvgConfig');

module.exports = {
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
};
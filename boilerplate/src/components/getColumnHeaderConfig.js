const svg = require('./getSvgConfig');

module.exports = (columnName) => ({
  tag: `td`,
  id: `${columnName}-header`,
  children: [
    {
      class: `resizable`,
      textContent: `${columnName}`,
      children: [
        svg(`sort-symbol`)
      ]
    },
  ]
});

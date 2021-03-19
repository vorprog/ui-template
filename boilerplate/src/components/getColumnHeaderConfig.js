const svg = require('./getSvgConfig');

/**
 * @param {string} columnName
 * @returns {import('../utilities/newElement').ElementConfig}
 */
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

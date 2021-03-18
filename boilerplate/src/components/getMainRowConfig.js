const svgButton = require('./getButton');
const input = require('./getInputConfig');

/** @returns {import('../utilities/newElement').ElementConfig} */
const getActionButtonsConfig = () => ({
  id: `action-buttons`,
  children: [
    svgButton(`refresh-symbol`, 24),
    svgButton(`add-symbol`, 24),
    svgButton(`remove-symbol`, 24),
    svgButton(`sort-down-symbol`, 24)
  ]
});

/** @returns {import('../utilities/newElement').ElementConfig} */
const getBaseMainRowConfig = () => ({
  id: `main-row`,
  class: `row`,
  children: [{
    id: `action-bar`,
    class: `evenlySpaced grey-444 row`,
    children: [input({ id: `filter-input` }), getActionButtonsConfig()]
  }, {
    tag: `table`,
    id: `data-table`,
    class: `grey-222 row`
  }]
});

/**
 * @param {import('../utilities/newElement').ElementConfig} params
 * @returns {import('../utilities/newElement').ElementConfig}
*/
module.exports = (params) => Object.assign(getBaseMainRowConfig(), params);

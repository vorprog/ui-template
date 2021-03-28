/** @returns {import('../utilities/newElement').ElementConfig} */
const getBaseFooterConfig = () => ({
  id: `footer`,
  class: `grey row`,
  children: [{
    textContent: `FOOTER`
  }]
});

/**
 * @param {import('../utilities/newElement').ElementConfig} params
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (params = {}) => Object.assign(getBaseFooterConfig(), params);

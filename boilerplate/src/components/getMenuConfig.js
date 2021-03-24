/** @returns {import('../utilities/newElement').ElementConfig} */
const getBaseMenuConfig = () => ({
  id: `menu`,
  class: `grey-333 hidden popup`,
  children: [{
    class: `grey-border padded`,
    textContent: `Section 1`
  },
  {
    class: `grey-border padded`,
    textContent: `Section 2`
  },
  {
    class: `grey-border padded`,
    textContent: `Section 3`
  }]
});

/**
 * @param {import('../utilities/newElement').ElementConfig} params
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (params = {}) => Object.assign(getBaseMenuConfig(), params);

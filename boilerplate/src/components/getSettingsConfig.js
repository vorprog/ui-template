/** @returns {import('../utilities/newElement').ElementConfig} */
const getBaseSettingsConfig = () => ({
  id: `settings`,
  class: `grey-333 hidden right-side popup`,
  children: [{
    class: `grey-border padded`,
    textContent: `General Settings`
  },
  {
    class: `grey-border padded`,
    textContent: `Profile`
  },
  {
    class: `grey-border padded`,
    textContent: `Log out`
  }]
});

/**
 * @param {import('../utilities/newElement').ElementConfig} params
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (params = {}) => Object.assign(getBaseSettingsConfig(), params);

/** @returns {import('../utilities/newElement').ElementConfig} */
const getBaseNotificationsConfig = () => ({
  id: `notifications`,
  class: `grey-333 hidden right-side popup`,
  children: [{
    class: `grey-border padded`,
    textContent: `Notification 1`
  },
  {
    class: `grey-border padded`,
    textContent: `Notification 2`
  },
  {
    class: `grey-border padded`,
    textContent: `Notification 3`
  }]
});

/**
 * @param {import('../utilities/newElement').ElementConfig} params
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (params = {}) => Object.assign(getBaseNotificationsConfig(), params);

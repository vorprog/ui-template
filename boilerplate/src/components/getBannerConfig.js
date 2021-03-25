const toggleHiddenElement = require('../actions/toggleHiddenElement');

/** 
 * @param {string} bannerMessage
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (bannerMessage) => ({
  id: `banner`,
  class: `blue-247 row`,
  children: [
    {},
    {
      class: `padded`,
      textContent: `X`,
      onclick: () => toggleHiddenElement(`banner`)
    }, {
      class: `padded row`,
      textContent: bannerMessage
    }]
});

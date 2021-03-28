const toggleHiddenElement = require('../actions/toggleHiddenElement');

/** 
 * @param {string} bannerMessage
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (bannerMessage = `<banner message>`, id = `banner`) => ({
  id: id,
  class: `blue-247 row`,
  children: [
    {},
    {
      class: `padded`,
      textContent: `X`,
      onclick: () => toggleHiddenElement(id)
    }, {
      class: `padded row`,
      textContent: bannerMessage
    }]
});

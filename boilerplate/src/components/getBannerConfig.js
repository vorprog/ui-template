const toggleHiddenElement = require('../actions/toggleHiddenElement');
const svg = require('./getSvgConfig');

/** 
 * @param {string} bannerMessage
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (bannerMessage = `<banner message>`, id = `banner`) => ({
  id: id,
  class: `blue-247 autofill row`,
  children: [
        {
      class: `padded autofilling`,
      textContent: bannerMessage
    },
    {
      class: `autofilling`,
      onclick: () => toggleHiddenElement(id),
      children: [svg(`close`, { id: `banner-close-svg`, height: 12, width: 12, fill: `#BBB`})]
    }
  ]
});

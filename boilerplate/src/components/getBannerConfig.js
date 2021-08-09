const toggleHiddenElement = require('../actions/toggleHiddenElement');
const svg = require('./getSvgConfig');

/** 
 * @param {string} bannerMessage
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (bannerMessage = `<banner message>`, id = `banner`) => ({
  id: id,
  class: `blue-35a row`,
  children: [
    {
      class: `row`,
      children: [
        {}, // spacer
        svg(`close`, { id: `banner-close-svg`, height: 24, width: 24, fill: `#BBB`, onclick: () => toggleHiddenElement(id) })
      ]
    },
    {
      class: `padded row`,
      textContent: bannerMessage
    }
  ]
});

const toggleHiddenElement = require('../actions/toggleHiddenElement');
const svg = require('./getSvgConfig');

/** 
 * @param {string} bannerMessage
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (bannerMessage = `<banner message>`, id = `banner`) => ({
  id: id,
  class: `blue-247 row`,
  style: `display:table;`,
  children: [
        {
      class: `padded`,
      style: `display:table-cell;`,
      textContent: bannerMessage
    },
    {
      onclick: () => toggleHiddenElement(id),
      style: `display:table-cell;`,
      children: [svg(`close`, { id: `banner-close-svg`, height: 12, width: 12, fill: `#BBB`})]
    }
  ]
});

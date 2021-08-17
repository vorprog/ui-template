const svg = require('./getSvgConfig');

/** 
 * @param {string} bannerMessage
 * @returns {import('@vorprog/elemancer').ElementConfig}
 */
module.exports = (bannerMessage = `<banner message>`, id = `banner`) => ({
  id: id,
  class: `blue-35a row`,
  children: [
    {
      class: `row`,
      children: [
        {}, // spacer
        svg(`close`, { height: `20px`, width: `20px`, fill: `#BBB`, onclick: () => document.getElementById(id).classList.toggle(`hidden`) })
      ]
    },
    {
      id: `${id}-message`,
      class: `padded row`,
      textContent: bannerMessage
    }
  ]
});

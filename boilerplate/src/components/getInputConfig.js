/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `input-filter`,
  class: `grey-222 padded curved input`,
  contenteditable: `true`,
  placeholder: `filter . . .`
}, customConfig);

/** @returns {import('../utilities/newElement').ElementConfig} */
const getBaseInputConfig = () => ({
  id: `input-filter`,
  class: `grey-222 padded curved input`,
  contenteditable: `true`,
  placeholder: `filter . . .`
});

/**
 * @param {import('../utilities/newElement').ElementConfig} params
 * @returns {import('../utilities/newElement').ElementConfig}
*/
module.exports = (params) => Object.assign(getBaseInputConfig(), params);

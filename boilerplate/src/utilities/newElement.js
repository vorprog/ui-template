const loop = require('../utilities/loop');

/**
 * @typedef {Object} ElementConfig
 * @property {string} tag - HTML element tag
 * @property {string} xmlns - XML namespace (defaults to http://www.w3.org/1999/xhtml)
 * @property {string} textContent
 * @property {ElementConfig[]} children
 */

/**
 * @param {HTMLElement} parent
 * @param {ElementConfig} params
 * @returns {HTMLElement | SVGElement}
*/
const newElement = (parent, params = {}) => {
  const element = document.createElementNS(params.xmlns || `http://www.w3.org/1999/xhtml`, params.tag || `div`);
  element.textContent = params.textContent || null;
  loop(params.children, (key, child) => newElement(element, child));

  delete params.xmlns;
  delete params.tag;
  delete params.textContent;
  delete params.children;

  loop(params, (key, value) => element.setAttribute(key, value || ``));
  return parent.appendChild(element);
};

module.exports = newElement;

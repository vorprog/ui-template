const map = require('lodash.map');

/**
 * @typedef {Object} elementConfig
 * @property {string} tag - HTML element tag
 * @property {string} xmlns - XML namespace (defaults to http://www.w3.org/1999/xhtml)
 * @property {string} textContent
 * @property {elementConfig[]} children
 */

/**
 * @param {HTMLElement} parent
 * @param {elementConfig} params
 * @returns {HTMLElement | SVGElement}
*/
const newElement = (parent, params = {}) => {
  const element = document.createElementNS(params.xmlns || `http://www.w3.org/1999/xhtml`, params.tag || `div`);
  element.textContent = params.textContent || null;
  map(params.children, child => newElement(element, child));

  delete params.xmlns;
  delete params.tag;
  delete params.textContent;
  delete params.children;

  map(params, (value, key) => element.setAttribute(key, value || ``));
  return parent.appendChild(element)
};

module.exports = newElement;

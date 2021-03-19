const loop = require('./utilities/loop');
const newElement = require('./utilities/newElement');
const header = require('./components/getHeaderConfig');
const svgContent = require('./components/getSvgContentConfig');
const mainRow = require('./components/getMainRowConfig');
const footer = require('./components/getFooter');
const fillDataTable = require('./actions/fillDataTable');

const startup = async () => {
  console.log(`Document intialized.`);

  const urlParams = new URLSearchParams(window.location.search);
  loop(Object.fromEntries(urlParams), (key, value) => console.log(`Key: ${key}, Value: ${value}`));

  document.body.classList.add(`grey-111`);

  const svgContentElement = newElement(document.body, svgContent());
  const headerElement = newElement(document.body, header());
  const mainRowElement = newElement(document.body, mainRow());
  const footerElement = newElement(document.body, footer());

  document.getElementById(`filter-input`).focus();

  await fillDataTable();
};

(async () => {
  document.addEventListener(`DOMContentLoaded`, startup);
})();

const loop = require('./utilities/loop');
const randomData = require('./data/randomData');
const newElement = require('./utilities/newElement');
const columnHeader = require('./components/getColumnHeaderConfig');
const svgContent = require('./components/getSvgContentConfig');

const startup = () => {
  console.log(`Document intialized.`);

  const urlParams = new URLSearchParams(window.location.search);
  loop(Object.fromEntries(urlParams), (key, value) => console.log(`Key: ${key}, Value: ${value}`));

  document.body.classList.add(`grey-111`);
  const svgContentElement = newElement(document.body, svgContent);

  // TODO: show number of resuls and number selected
  document.getElementById(`input-filter`).focus();
  const dataTable = document.getElementById(`data-table`);
  newElement(dataTable, {
    tag: `tr`,
    class: `grey-444`,
    children: [
      columnHeader(`column1`),
      columnHeader(`column2`),
      columnHeader(`column3`),
      columnHeader(`column4`)
    ]
  });

  loop(40, key => {
    const someRandomData = randomData();
    newElement(dataTable, {
      tag: `tr`,
      id: `data-${key}`,
      children: [
        { tag: `td`, class: `grey-border`, textContent: someRandomData.randomWord },
        { tag: `td`, class: `grey-border`, textContent: someRandomData.randomPangram },
        { tag: `td`, class: `grey-border`, textContent: someRandomData.randomInteger },
        { tag: `td`, class: `grey-border`, textContent: someRandomData.randomGuid },
      ]
    });
  });
};

(async () => {
  document.addEventListener(`DOMContentLoaded`, startup);
})();

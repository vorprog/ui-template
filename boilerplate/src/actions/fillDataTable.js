const randomData = require('../data/randomData');
const columnHeader = require('../components/getColumnHeaderConfig');
const utilities = require('../utilities');

module.exports = () => {
  // TODO: show number of results and number selected
  const dataTable = document.getElementById(`data-table`);
  utilities.newElement(dataTable, {
    tag: `tr`,
    class: `grey-444`,
    children: [
      columnHeader(`column1`),
      columnHeader(`column2`),
      columnHeader(`column3`),
      columnHeader(`column4`)
    ]
  });

  utilities.loop(40, key => {
    const someRandomData = randomData();
    utilities.newElement(dataTable, {
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
}
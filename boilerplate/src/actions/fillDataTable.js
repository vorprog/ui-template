const columnHeader = require('../components/getColumnHeaderConfig');
const util = require('../utilities');

const userName = `richardsnider`
const rootFolderUrl = `https://api.github.com/repos/${userName}/${userName}.github.io/contents`;
let dataTable = null;

module.exports = async (path = ``) => {
  const fetchContentsTask = fetch(`${rootFolderUrl}/${path}`)

  // TODO: show number of results and number selected
  dataTable = document.getElementById(`data-table`);
  util.clearElement(dataTable);

  util.newElement(dataTable, {
    tag: `tr`,
    class: `grey-444`,
    children: [
      columnHeader(`name`),
      columnHeader(`type`),
      columnHeader(`download_url`),
      columnHeader(`column4`)
    ]
  });

  const contentsReponse = await fetchContentsTask;
  const contentsJson = await contentsReponse.json();

  util.loop(contentsJson, (key, value) => util.newElement(dataTable, {
    tag: `tr`,
    id: `data-${key}`,
    children: [
      { tag: `td`, class: `grey-border`, textContent: value.name },
      { tag: `td`, class: `grey-border`, textContent: value.type },
      { tag: `td`, class: `grey-border`, textContent: value.download_url },
      { tag: `td`, class: `grey-border`, textContent: `${userName}.github.io/${value.path}` }
    ]
  }));
};

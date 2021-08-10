const columnHeader = require('../components/getColumnHeaderConfig');
const util = require('../utilities/all');
const makeGithubContentsRequest = require('./makeGithubContentsRequest');
const getButtonConfig = require('../components/getButtonConfig');
const updateQueryString = require('../utilities/updateQueryString');

const githubPagesDomain = `${window.env.GITHUB_USERNAME}.github.io`;
const setDirectory = (path) => updateQueryString(`directory`, path);

const fillDataTable = async (path = ``) => {
  const requestContentsTask = makeGithubContentsRequest(path);

  // TODO: show number of results and number selected
  const dataTable = document.getElementById(`data-table`);
  util.clearElement(dataTable);

  util.newElement(dataTable, {
    tag: `tr`,
    class: `grey-444`,
    children: [
      { tag: `td`},
      columnHeader(`name`),
      columnHeader(`type`),
      columnHeader(`download link`)
    ]
  });

  const parentPath = path.substr(0, path.lastIndexOf(`/`) || path.length - 1);
  if (path && path != ``) util.newElement(dataTable, parentDirectoryRowConfig(parentPath));

  const contentsReponse = await requestContentsTask;
  if (contentsReponse.status !== 200) throw new Error(`Github returned status code ${contentsReponse.status} ${await contentsReponse.text()}`);

  /** @type {Array<import('./makeGithubContentsRequest').GithubResponse>} */
  const contents = await contentsReponse.json();
  generateRows(dataTable, contents);
};

/**
 * @param {HTMLElement} tableCellElement
 */
const toggleRowSelection = (tableCellElement) => {
  const parentTableRowClasses = tableCellElement.parentElement.classList;
  if(parentTableRowClasses.contains(`blue-35a`)) parentTableRowClasses.remove(`blue-35a`)
  else parentTableRowClasses.add(`blue-35a`);
}

const parentDirectoryRowConfig = (path) => ({
  tag: `tr`,
  onclick: (event) => toggleRowSelection(event.target),
  children: [
    {
      tag: `td`,
      class: `padded grey-border`,
      children: [
        getButtonConfig(`folder`, {
          height: `20px`,
          width: `20px`,
          onclick: () => fillDataTable(path) && setDirectory(path)
        })
      ]
    },
    {
      tag: `td`,
      class: `padded grey-border`,
      children: [{ tag: `a`, textContent: `../` }]
    },
    {
      tag: `td`,
      class: `padded grey-border`,
      textContent: `dir`
    },
    {
      tag: `td`,
      class: `padded grey-border`,
    }
  ]
});

/**
 * @param {HTMLElement} tableElement 
 * @param {Array<import('./makeGithubContentsRequest').GithubResponse>} contents
 * @returns {Array<HTMLElement>}
 */
const generateRows = (tableElement, contents) => util.loop(contents, (key, /** @type {import('./makeGithubContentsRequest').GithubResponse} */ value) =>
  util.newElement(tableElement, {
    tag: `tr`,
    onclick: (event) => toggleRowSelection(event.target),
    id: `data-${key}`,
    children: [
      {
        tag: `td`,
        class: `padded grey-border`,
        children: value.type === `dir` ?
          [getButtonConfig(`folder`, {
            height: `20px`,
            width: `20px`,
            onclick: () => fillDataTable(value.path) && setDirectory(value.path)
          })] : { }
      },
      {
        tag: `td`,
        class: `padded grey-border`,
        children: [
          {
            tag: `a`,
            href: value.type === `dir` ? value.html_url : value.download_url,
            target: `_blank`,
            textContent: value.name
          }
        ]
      },
      {
        tag: `td`,
        class: `padded grey-border`,
        textContent: value.type
      },
      {
        tag: `td`,
        class: `padded grey-border`,
        children: [{
          tag: `a`,
          href: `https://${githubPagesDomain}/${value.path}`,
          target: `_blank`,
          textContent: `${githubPagesDomain}/${value.path}`
        }]
      }
    ]
  }));

module.exports = fillDataTable;
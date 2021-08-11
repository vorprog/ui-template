const columnHeader = require('../components/getColumnHeaderConfig');
const util = require('../utilities/all');
const makeGithubContentsRequest = require('./makeGithubContentsRequest');
const getButtonConfig = require('../components/getButtonConfig');
const updateQueryString = require('../utilities/updateQueryString');

const githubPagesDomain = `${window.env.GITHUB_USERNAME}.github.io`;
const setDirectory = (path) => updateQueryString(`directory`, path);

const fillDataTable = async (path = ``) => {
  const requestContentsTask = makeGithubContentsRequest(path);
  const requestStatusBanner = document.getElementById(`request-status-banner`);
  const requestStatusBannerMessage = document.getElementById(`request-status-banner-message`);
  requestStatusBanner.classList.remove(`hidden`);
  requestStatusBannerMessage.textContent = `Fetching ${path} . . .`;
  requestStatusBanner.style.backgroundColor = `grey`;

  const dataTableHead = document.getElementById(`data-table-head`);
  const dataTableBody = document.getElementById(`data-table-body`);
  util.clearElement(dataTableHead);
  util.clearElement(dataTableBody);

  const contentsResponse = await requestContentsTask;
  if (contentsResponse.status !== 200) {
    requestStatusBannerMessage.textContent = `Github returned status code ${contentsResponse.status} ${await contentsResponse.text()}`;
    requestStatusBanner.style.backgroundColor = `red`;
    return;
  }

  /** @type {Array<import('./makeGithubContentsRequest').GithubResponse>} */
  const contents = await contentsResponse.json()
  requestStatusBannerMessage.textContent = `${contents.length} results returned!`;
  requestStatusBanner.style.backgroundColor = `green`;

  const parentPath = path.substr(0, path.lastIndexOf(`/`) || path.length - 1);
  util.newElement(dataTableHead, {
    tag: `tr`,
    children: [
      {
        tag: `th`,
        class: `padded`,
        children: [
          getButtonConfig(`back`, {
            onclick: () => fillDataTable(parentPath) && setDirectory(parentPath)
          })
        ]
      },
      columnHeader(`name`),
      columnHeader(`type`),
      columnHeader(`download link`)
    ]
  });

  generateRows(dataTableBody, contents);
};

/**
 * @param {HTMLElement} tableCellElement
 */
const toggleRowSelection = (tableCellElement) => {
  const parentTableRowClasses = tableCellElement.parentElement.classList;
  if (parentTableRowClasses.contains(`blue-35a`)) parentTableRowClasses.remove(`blue-35a`)
  else parentTableRowClasses.add(`blue-35a`);
}

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
          })] : {}
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
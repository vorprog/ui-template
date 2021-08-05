const columnHeader = require('../components/getColumnHeaderConfig');
const util = require('../utilities/all');
const makeGithubContentsRequest = require('./makeGithubContentsRequest');
const getButtonConfig = require('../components/getButtonConfig');

const githubPagesDomain = `${window.env.GITHUB_USERNAME}.github.io`;

const fillDataTable = async (path = ``) => {
  const requestContentsTask = makeGithubContentsRequest(path);

  // TODO: show number of results and number selected
  const dataTable = document.getElementById(`data-table`);
  util.clearElement(dataTable);

  util.newElement(dataTable, {
    tag: `tr`,
    class: `grey-444`,
    children: [
      columnHeader(`name`),
      columnHeader(`type`),
      columnHeader(`download link`)
    ]
  });

  const parentPath = path.substr(0, path.lastIndexOf(`/`) || path.length-1);

  util.newElement(dataTable, {
    tag: `tr`,
    children: [
      {
        tag: `td`,
        class: `padded grey-border`,
        children: [
                getButtonConfig(`folder`, { height: `12px`, width: `12px`, onclick: () => (fillDataTable(parentPath))}),
                { tag: `a`, textContent: `../` }
        ]
      },
      {
        tag: `td`,
        class: `padded grey-border`,
        textContent: `dir`
      },
      {
        tag: `td`,
        class: `padded grey-border`,
        children: [{
          textContent: `N/A`
        }]
      }
    ]
  });

  const contentsReponse = await requestContentsTask;
  if (contentsReponse.status !== 200) throw new Error(`Github returned status code ${contentsReponse.status} ${await contentsReponse.text()}`);

  /** @type {Array<import('./makeGithubContentsRequest').GithubResponse>} */
  const contents = await contentsReponse.json();
  generateRows(dataTable, contents);
};

/**
 * @param {HTMLElement} tableElement 
 * @param {Array<import('./makeGithubContentsRequest').GithubResponse>} contents
 * @returns {Array<HTMLElement>}
 */
const generateRows = (tableElement, contents) => util.loop(contents, (key, /** @type {import('./makeGithubContentsRequest').GithubResponse} */ value) =>
  util.newElement(tableElement, {
    tag: `tr`,
    id: `data-${key}`,
    children: [
      {
        tag: `td`,
        class: `padded grey-border`,
        children: [
          value.type === `dir` ? getButtonConfig(`folder`, { height: `12px`, width: `12px`, onclick: () => (fillDataTable(value.path)) }) : {}, 
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
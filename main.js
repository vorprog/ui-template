/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/actions/fillDataTable.js":
/*!**************************************!*\
  !*** ./src/actions/fillDataTable.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const columnHeader = __webpack_require__(/*! ../components/getColumnHeaderConfig */ "./src/components/getColumnHeaderConfig.js");
const util = __webpack_require__(/*! ../utilities/all */ "./src/utilities/all.js");
const makeGithubContentsRequest = __webpack_require__(/*! ./makeGithubContentsRequest */ "./src/actions/makeGithubContentsRequest.js");
const getButtonConfig = __webpack_require__(/*! ../components/getButtonConfig */ "./src/components/getButtonConfig.js");
const updateQueryString = __webpack_require__(/*! ../utilities/updateQueryString */ "./src/utilities/updateQueryString.js");

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


  util.newElement(dataTableHead, {
    tag: `tr`,
    children: [
      { tag: `th` },
      columnHeader(`name`),
      columnHeader(`type`),
      columnHeader(`download link`)
    ]
  });

  const parentPath = path.substr(0, path.lastIndexOf(`/`) || path.length - 1);
  if (path && path != ``) util.newElement(dataTableBody, parentDirectoryRowConfig(parentPath));
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

/***/ }),

/***/ "./src/actions/makeGithubContentsRequest.js":
/*!**************************************************!*\
  !*** ./src/actions/makeGithubContentsRequest.js ***!
  \**************************************************/
/***/ ((module) => {

const userName = `richardsnider`;
const rootFolderUrl = `https://api.github.com/repos/${window.env.GITHUB_USERNAME}/${window.env.GITHUB_USERNAME}.github.io/contents`;

/**
 * @typedef {Object} GithubResponse
 * @property {('dir'|'file'|'symlink')} type
 * @property {string} path
 * @property {string} download_url
 * @property {sting} html_url
 */

/**
 * 
 * @param {string} path
 * @returns {Promise<Response>}
 */
module.exports = async (path = ``) => fetch(`${rootFolderUrl}/${path}`);


/***/ }),

/***/ "./src/components/getActionsbuttonsConfig.js":
/*!***************************************************!*\
  !*** ./src/components/getActionsbuttonsConfig.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fillDataTable = __webpack_require__(/*! ../actions/fillDataTable */ "./src/actions/fillDataTable.js");
const button = __webpack_require__(/*! ./getButtonConfig */ "./src/components/getButtonConfig.js");

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (customConfig = {}) => Object.assign({
  id: `action-buttons`,
  children: [
    button(`refresh`, { onclick: () => {
      const targetDirectory = new URLSearchParams(location.search).get(`directory`) || ``;
      fillDataTable(targetDirectory);
    }}),
    button(`add`),
    button(`remove`),
    button(`sort-down`)
  ]
}, customConfig);

/***/ }),

/***/ "./src/components/getBannerConfig.js":
/*!*******************************************!*\
  !*** ./src/components/getBannerConfig.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const svg = __webpack_require__(/*! ./getSvgConfig */ "./src/components/getSvgConfig.js");

/** 
 * @param {string} bannerMessage
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (bannerMessage = `<banner message>`, id = `banner`) => ({
  id: id,
  class: `blue-35a row`,
  children: [
    {
      class: `row`,
      children: [
        {}, // spacer
        svg(`close`, { height: `20px`, width: `20px`, fill: `#BBB`, onclick: () => document.getElementById(id).classList.toggle(`hidden`) })
      ]
    },
    {
      id: `${id}-message`,
      class: `padded row`,
      textContent: bannerMessage
    }
  ]
});


/***/ }),

/***/ "./src/components/getButtonConfig.js":
/*!*******************************************!*\
  !*** ./src/components/getButtonConfig.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const svg = __webpack_require__(/*! ./getSvgConfig */ "./src/components/getSvgConfig.js");

/**
 * @param {string} symbolName
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (symbolName, customConfig = {}) => svg(symbolName, Object.assign({
  width: `24px`,
  height: `24px`,
  class: `clickable padded curved grey-border`
}, customConfig))


/***/ }),

/***/ "./src/components/getColumnHeaderConfig.js":
/*!*************************************************!*\
  !*** ./src/components/getColumnHeaderConfig.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const button = __webpack_require__(/*! ./getButtonConfig */ "./src/components/getButtonConfig.js");

/**
 * @param {string} columnName
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (columnName) => ({
  tag: `th`,
  id: `${columnName}-header`,
  children: [
    {
      class: `padded resizable`,
      textContent: `${columnName}`,
      children: [
        button(`sort`)
      ]
    },
  ]
});


/***/ }),

/***/ "./src/components/getFooterConfig.js":
/*!*******************************************!*\
  !*** ./src/components/getFooterConfig.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const svg = __webpack_require__(/*! ./getSvgConfig */ "./src/components/getSvgConfig.js");

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
module.exports = (customConfig = {}) => Object.assign({
  id: `footer`,
  class: `grey row`,
  children: [{
    children: [
      { tag: `a`, href: `https://linkedin.com/in/richardsnider`, children: [svg(`linkedin`, { fill: `#BBB` })] },
      { tag: `a`, href: `https://github.com/richardsnider`, children: [svg(`github`, { fill: `#BBB` })] },
      { textContent: `Created by Richard Snider` }
    ]
  }
  ]
}, customConfig);


/***/ }),

/***/ "./src/components/getHeaderConfig.js":
/*!*******************************************!*\
  !*** ./src/components/getHeaderConfig.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const svg = __webpack_require__(/*! ./getSvgConfig */ "./src/components/getSvgConfig.js");

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `header`,
  class: `grey-666 row`,
  children: [{
    id: `left-header`,
    children: [
      {
        id: `menu-button`,
        onclick: () => document.getElementById(`menu`).classList.toggle(`hidden`),
        children: [svg(`menu`)]
      },
      {
        onclick: () => document.getElementById(`search`).classList.toggle(`hidden`),
        children: [svg(`search`)]
      }
    ]
  },
  {
    id: `right-header`,
    children: [
      {
        onclick: () => document.getElementById(`notifications`).classList.toggle(`hidden`),
        children: [svg(`notifications`)]
      },
      {
        onclick: () => document.getElementById(`settings`).classList.toggle(`hidden`),
        children: [svg(`settings`)]
      }
    ]
  }]
}, customConfig);


/***/ }),

/***/ "./src/components/getInputConfig.js":
/*!******************************************!*\
  !*** ./src/components/getInputConfig.js ***!
  \******************************************/
/***/ ((module) => {

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `input-filter`,
  class: `grey-222 padded curved input`,
  contenteditable: `true`,
  placeholder: `(work in progress) . . .`
}, customConfig);


/***/ }),

/***/ "./src/components/getMainRowConfig.js":
/*!********************************************!*\
  !*** ./src/components/getMainRowConfig.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const input = __webpack_require__(/*! ./getInputConfig */ "./src/components/getInputConfig.js");
const getActionButtonsConfig = __webpack_require__(/*! ./getActionsbuttonsConfig */ "./src/components/getActionsbuttonsConfig.js");
const getBannerConfig = __webpack_require__(/*! ./getBannerConfig */ "./src/components/getBannerConfig.js");

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `main-row`,
  class: `row`,
  children: [{
    id: `action-bar`,
    class: `grey-444 row`,
    children: [
      input({ id: `filter-input` }), 
      getActionButtonsConfig()
    ]
  },
  getBannerConfig(`Loading . . .`, `request-status-banner`),
  {
    tag: `table`,
    id: `data-table`,
    class: `row`,
    children: [
      {
        tag: `thead`,
        class: `grey-444`,
        id: `data-table-head`
      },
      {
        tag: `tbody`,
        class: `grey-222`,
        id: `data-table-body`
      }
    ]
  }
]
}, customConfig);


/***/ }),

/***/ "./src/components/getMenuConfig.js":
/*!*****************************************!*\
  !*** ./src/components/getMenuConfig.js ***!
  \*****************************************/
/***/ ((module) => {

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `menu`,
  class: `grey-333 hidden popup`,
  children: [{
    class: `grey-border padded`,
    textContent: `Section 1`
  },
  {
    class: `grey-border padded`,
    textContent: `Section 2`
  },
  {
    class: `grey-border padded`,
    textContent: `Section 3`
  }]
}, customConfig);


/***/ }),

/***/ "./src/components/getNotificationsConfig.js":
/*!**************************************************!*\
  !*** ./src/components/getNotificationsConfig.js ***!
  \**************************************************/
/***/ ((module) => {

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `notifications`,
  class: `grey-333 hidden right-side popup`,
  children: [{
    class: `grey-border padded`,
    textContent: `Notification 1`
  },
  {
    class: `grey-border padded`,
    textContent: `Notification 2`
  },
  {
    class: `grey-border padded`,
    textContent: `Notification 3`
  }]
}, customConfig);


/***/ }),

/***/ "./src/components/getSettingsConfig.js":
/*!*********************************************!*\
  !*** ./src/components/getSettingsConfig.js ***!
  \*********************************************/
/***/ ((module) => {

/** 
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (customConfig = {}) => Object.assign({
  id: `settings`,
  class: `grey-333 hidden right-side popup`,
  children: [{
    class: `grey-border padded`,
    textContent: `General Settings`
  },
  {
    class: `grey-border padded`,
    textContent: `Profile`
  },
  {
    class: `grey-border padded`,
    textContent: `Log out`
  }]
}, customConfig);


/***/ }),

/***/ "./src/components/getSvgConfig.js":
/*!****************************************!*\
  !*** ./src/components/getSvgConfig.js ***!
  \****************************************/
/***/ ((module) => {

/** 
 * @param {string} symbolName
 * @param {import('../utilities/newElement').ElementConfig} customConfig
 * @returns {import('../utilities/newElement').ElementConfig}
 */
 module.exports = (symbolName, customConfig = {}) => Object.assign({
  xmlns: `http://www.w3.org/2000/svg`,
  tag: `svg`,
  id: `${symbolName}-svg`,
  width: `40px`,
  height: `40px`,
  class: `padded`,
  viewBox: `0 0 24 24`,
  children: [{
    xmlns: `http://www.w3.org/2000/svg`,
    tag: `use`,
    href: `#${symbolName}-symbol`,
  }]
}, customConfig);


/***/ }),

/***/ "./src/components/getSvgContentConfig.js":
/*!***********************************************!*\
  !*** ./src/components/getSvgContentConfig.js ***!
  \***********************************************/
/***/ ((module) => {

/** @returns {import('../utilities/newElement').ElementConfig} */
const getSymbolConfig = (symbolName, pathDataString) => ({
  xmlns: `http://www.w3.org/2000/svg`,
  tag: `symbol`,
  id: `${symbolName}-symbol`,
  children: [{
    xmlns: `http://www.w3.org/2000/svg`,
    tag: `path`,
    d: pathDataString
  }]
});

/** @returns {import('../utilities/newElement').ElementConfig} */
module.exports = () => ({
  xmlns: `http://www.w3.org/2000/svg`,
  tag: `svg`,
  id: `svg-content`,
  style: `display: none;`,
  children: [
    getSymbolConfig(`sort`, `M12 0l8 10h-16l8-10zm8 14h-16l8 10 8-10z`),
    getSymbolConfig(`sort-down`, `M12 0m8 7h-16l8 10 8-10z`),
    getSymbolConfig(`sort-up`, `M12 7l8 10h-16l8-10z`),
    getSymbolConfig(`check`, `M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z`),
    getSymbolConfig(`switch`, `M18 18h-12c-3.311 0-6-2.689-6-6s2.689-6 6-6h12.039c3.293.021 5.961 2.701 5.961 6 0 3.311-2.688 6-6 6zm0-10h-12c-2.208 0-4 1.792-4 4s1.792 4 4 4h12c2.208 0 4-1.792 4-4 0-2.199-1.778-3.986-3.974-4h-.026zm-12 1c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z`),
    getSymbolConfig(`profile`, `M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z`),
    getSymbolConfig(`settings`, `M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z`),
    getSymbolConfig(`menu`, `M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z`),
    getSymbolConfig(`notifications`, `M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z`),
    getSymbolConfig(`search`, `M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z`),
    getSymbolConfig(`refresh`, `M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z`),
    getSymbolConfig(`add`, `M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10`),
    getSymbolConfig(`remove`, `M0 10h24v4h-24z`),
    getSymbolConfig(`close`, `M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z`),
    getSymbolConfig(`view`, `M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z`),
    getSymbolConfig(`edit`, `M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z`),
    getSymbolConfig(`download`, `M16 11h5l-9 10-9-10h5v-11h8v11zm3 8v3h-14v-3h-2v5h18v-5h-2z`),
    getSymbolConfig(`folder`, `M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z`),
    getSymbolConfig(`github`, `M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12`),
    getSymbolConfig(`linkedin`, `M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z`),
  ]
});


/***/ }),

/***/ "./src/data/messages.js":
/*!******************************!*\
  !*** ./src/data/messages.js ***!
  \******************************/
/***/ ((module) => {

module.exports = {
  bannerMessage: `Hello! Welcome to my github pages website (work in progress)! This UI uses github's web api to help you view files and directories I keep in this repo. I'm not a front-end expert and chose to develop and experiment with my own user interface library rather than just create another react app.`,
};


/***/ }),

/***/ "./src/utilities/all.js":
/*!******************************!*\
  !*** ./src/utilities/all.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const keyValuePair = __webpack_require__(/*! ./keyValuePair */ "./src/utilities/keyValuePair.js");
const loop = __webpack_require__(/*! ./loop */ "./src/utilities/loop.js");
const loopToObject = __webpack_require__(/*! ./loopToObject */ "./src/utilities/loopToObject.js");
const newElement = __webpack_require__(/*! ./newElement */ "./src/utilities/newElement.js");
const clearElement = __webpack_require__(/*! ./clearElement */ "./src/utilities/clearElement.js");

module.exports = {
  keyValuePair: keyValuePair,
  loop: loop,
  loopToObject: loopToObject,
  newElement: newElement,
  clearElement: clearElement,
};


/***/ }),

/***/ "./src/utilities/clearElement.js":
/*!***************************************!*\
  !*** ./src/utilities/clearElement.js ***!
  \***************************************/
/***/ ((module) => {

/**
 * @param {HTMLElement} parent 
 */
module.exports = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  parent.innerHTML = ``;
};


/***/ }),

/***/ "./src/utilities/keyValuePair.js":
/*!***************************************!*\
  !*** ./src/utilities/keyValuePair.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = function kvp(key, value) { this.key = key; this.value = value; };

/***/ }),

/***/ "./src/utilities/loop.js":
/*!*******************************!*\
  !*** ./src/utilities/loop.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const loopToObject = __webpack_require__(/*! ./loopToObject */ "./src/utilities/loopToObject.js");

module.exports = (collection, operation) => {
  const objectResult = loopToObject(collection, operation);
  if(objectResult == null) return;
  const resultKeys = Object.keys(objectResult);

  if (hasAllNumericValues(resultKeys)) {
    const arrayResult = Object.values(objectResult);
    if (typeof collection === `string` && hasAllStringValues(arrayResult))
      return getStringFromArray(arrayResult);

    return arrayResult;
  }

  return objectResult;
}

const hasAllNumericValues = keyArray => keyArray.every(isFinite)
const hasAllStringValues = array => array.every(value => typeof value === `string`);
const getStringFromArray = array => array.join(``);


/***/ }),

/***/ "./src/utilities/loopToObject.js":
/*!***************************************!*\
  !*** ./src/utilities/loopToObject.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const kvp = __webpack_require__(/*! ./keyValuePair */ "./src/utilities/keyValuePair.js");

const defaultOperation = (key, value) => new kvp(key, value);

module.exports = (collection, operation = defaultOperation) => {
  const isCollectionEmpty = !collection || (isNaN(collection) && Object.keys(collection).length == 0);
  if(isCollectionEmpty) return;

  const isCollectionAnArray = Array.isArray(collection);
  const isCollectionAnInteger = isFinite(collection);

  if (isCollectionAnInteger) collection = new Array(collection).fill(true);

  let completedIterations = 0;
  const objectResult = {};

  for (const [key, value] of Object.entries(collection)) {
    const formattedKey = isCollectionAnArray ? parseInt(key) : key;
    const iterationResult = operation(formattedKey, value, completedIterations);

    if (iterationResult == null) continue;

    if (iterationResult instanceof kvp)
      objectResult[iterationResult.key] = iterationResult.value;
    else objectResult[completedIterations] = iterationResult;

    completedIterations++;
  }

  return objectResult;
};


/***/ }),

/***/ "./src/utilities/newElement.js":
/*!*************************************!*\
  !*** ./src/utilities/newElement.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const loop = __webpack_require__(/*! ../utilities/loop */ "./src/utilities/loop.js");

/**
 * @typedef {Object} ElementConfig
 * @property {string} tag - HTML element tag
 * @property {string} xmlns - XML namespace (defaults to http://www.w3.org/1999/xhtml)
 * @property {string} textContent
 * @property {ElementConfig[]} children
 * @property {EventListener} onclick
 */

/**
 * @param {HTMLElement} parentElement
 * @param {ElementConfig} elementConfig
 * @returns {Element}
*/
const newElement = (parentElement, elementConfig = {}) => {
  const element = document.createElementNS(elementConfig.xmlns || `http://www.w3.org/1999/xhtml`, elementConfig.tag || `div`);
  element.textContent = elementConfig.textContent || null;
  loop(elementConfig.children, (key, childConfig) => newElement(element, childConfig));
  if(elementConfig.onclick) element.addEventListener("click", elementConfig.onclick);

  delete elementConfig.xmlns;
  delete elementConfig.tag;
  delete elementConfig.textContent;
  delete elementConfig.children;
  delete elementConfig.onclick;

  loop(elementConfig, (key, value) => element.setAttribute(key, value || ``));
  return parentElement.appendChild(element);
};

module.exports = newElement;


/***/ }),

/***/ "./src/utilities/updateQueryString.js":
/*!********************************************!*\
  !*** ./src/utilities/updateQueryString.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * 
 * @param {string} key 
 * @param {string} value 
 * @returns {void}
 */
module.exports = (key, value) => {
  const params = new URLSearchParams(location.search);
  params.set(key, value);
  const newUrl = `${location.origin}${location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const loop = __webpack_require__(/*! ./utilities/loop */ "./src/utilities/loop.js");
const newElement = __webpack_require__(/*! ./utilities/newElement */ "./src/utilities/newElement.js");
const messages = __webpack_require__(/*! ./data/messages */ "./src/data/messages.js");
const svgContent = __webpack_require__(/*! ./components/getSvgContentConfig */ "./src/components/getSvgContentConfig.js");
const banner = __webpack_require__(/*! ./components/getBannerConfig */ "./src/components/getBannerConfig.js");
const header = __webpack_require__(/*! ./components/getHeaderConfig */ "./src/components/getHeaderConfig.js");
const menu = __webpack_require__(/*! ./components/getMenuConfig */ "./src/components/getMenuConfig.js");
const notifications = __webpack_require__(/*! ./components/getNotificationsConfig */ "./src/components/getNotificationsConfig.js");
const settings = __webpack_require__(/*! ./components/getSettingsConfig */ "./src/components/getSettingsConfig.js");
const mainRow = __webpack_require__(/*! ./components/getMainRowConfig */ "./src/components/getMainRowConfig.js");
const footer = __webpack_require__(/*! ./components/getFooterConfig */ "./src/components/getFooterConfig.js");
const fillDataTable = __webpack_require__(/*! ./actions/fillDataTable */ "./src/actions/fillDataTable.js");

const startup = async () => {
  console.log(`Document intialized.`);

  document.body.classList.add(`grey-111`);

  const svgContentElement = newElement(document.body, svgContent());
  const bannerElement = newElement(document.body, banner(messages.bannerMessage, `welcome-banner`));
  const headerElement = newElement(document.body, header());
  const menuElement = newElement(document.body, menu());
  const notificationsElement = newElement(document.body, notifications());
  const settingsElement = newElement(document.body, settings());

  const mainRowElement = newElement(document.body, mainRow());
  const footerElement = newElement(document.body, footer());

  document.getElementById(`filter-input`).focus();

  const targetDirectory = new URLSearchParams(location.search).get(`directory`) || ``;
  await fillDataTable(targetDirectory);
};

(async () => {
  document.addEventListener(`DOMContentLoaded`, startup);
})();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map
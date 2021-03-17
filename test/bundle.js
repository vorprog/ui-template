/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const loop = __webpack_require__(/*! ./utilities/loop */ \"./src/utilities/loop.js\");\nconst randomData = __webpack_require__(/*! ./data/randomData */ \"./src/data/randomData.js\");\nconst newElement = __webpack_require__(/*! ./utilities/newElement */ \"./src/utilities/newElement.js\");\nconst columnHeader = __webpack_require__(/*! ./components/getColumnHeaderConfig */ \"./src/components/getColumnHeaderConfig.js\");\nconst svgContent = __webpack_require__(/*! ./components/getSvgContentConfig */ \"./src/components/getSvgContentConfig.js\");\n\nconst startup = () => {\n  console.log(`Document intialized.`);\n\n  const urlParams = new URLSearchParams(window.location.search);\n  loop(Object.fromEntries(urlParams), (key, value) => console.log(`Key: ${key}, Value: ${value}`));\n\n  document.body.classList.add(`grey-111`);\n  const svgContentElement = newElement(document.body, svgContent);\n\n  // TODO: show number of resuls and number selected\n  document.getElementById(`input-filter`).focus();\n  const dataTable = document.getElementById(`data-table`);\n  newElement(dataTable, {\n    tag: `tr`,\n    class: `grey-444`,\n    children: [\n      columnHeader(`column1`),\n      columnHeader(`column2`),\n      columnHeader(`column3`),\n      columnHeader(`column4`)\n    ]\n  });\n\n  loop(40, key => {\n    const someRandomData = randomData();\n    newElement(dataTable, {\n      tag: `tr`,\n      id: `data-${key}`,\n      children: [\n        { tag: `td`, class: `grey-border`, textContent: someRandomData.randomWord },\n        { tag: `td`, class: `grey-border`, textContent: someRandomData.randomPangram },\n        { tag: `td`, class: `grey-border`, textContent: someRandomData.randomInteger },\n        { tag: `td`, class: `grey-border`, textContent: someRandomData.randomGuid },\n      ]\n    });\n  });\n};\n\n(async () => {\n  document.addEventListener(`DOMContentLoaded`, startup);\n})();\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/components/getColumnHeaderConfig.js":
/*!*************************************************!*\
  !*** ./src/components/getColumnHeaderConfig.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const svg = __webpack_require__(/*! ./getSvgConfig */ \"./src/components/getSvgConfig.js\");\n\nmodule.exports = (columnName) => ({\n  tag: `td`,\n  id: `${columnName}-header`,\n  children: [\n    {\n      class: `resizable`,\n      textContent: `${columnName}`,\n      children: [\n        svg(`sort-symbol`)\n      ]\n    },\n  ]\n});\n\n\n//# sourceURL=webpack:///./src/components/getColumnHeaderConfig.js?");

/***/ }),

/***/ "./src/components/getSvgConfig.js":
/*!****************************************!*\
  !*** ./src/components/getSvgConfig.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = (symbolName, size = 12) => ({\n  xmlns: `http://www.w3.org/2000/svg`,\n  tag: `svg`,\n  id: `${symbolName}-svg`,\n  width: `${size}`,\n  height: `${size}`,\n  viewBox: `0 0 24 24`,\n  children: [{\n    xmlns: `http://www.w3.org/2000/svg`,\n    tag: `use`,\n    href: `#${symbolName}`,\n  }]\n});\n\n\n//# sourceURL=webpack:///./src/components/getSvgConfig.js?");

/***/ }),

/***/ "./src/components/getSvgContentConfig.js":
/*!***********************************************!*\
  !*** ./src/components/getSvgContentConfig.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const getSymbolConfig = (symbolId, pathDataString) => ({\n  xmlns: `http://www.w3.org/2000/svg`,\n  tag: `symbol`,\n  id: symbolId,\n  children: [{\n    xmlns: `http://www.w3.org/2000/svg`,\n    tag: `path`,\n    d: pathDataString\n  }]\n});\n\nmodule.exports = {\n  xmlns: `http://www.w3.org/2000/svg`,\n  tag: `svg`,\n  id: `svg-content`,\n  style: `display: none;`,\n  children: [\n    getSymbolConfig(`sort-symbol`, `M12 0l8 10h-16l8-10zm8 14h-16l8 10 8-10z`),\n    getSymbolConfig(`sort-down-symbol`, `M12 0m8 7h-16l8 10 8-10z`),\n    getSymbolConfig(`sort-up-symbol`, `M12 7l8 10h-16l8-10z`),\n    getSymbolConfig(`switch-symbol`, `M18 18h-12c-3.311 0-6-2.689-6-6s2.689-6 6-6h12.039c3.293.021 5.961 2.701 5.961 6 0 3.311-2.688 6-6 6zm0-10h-12c-2.208 0-4 1.792-4 4s1.792 4 4 4h12c2.208 0 4-1.792 4-4 0-2.199-1.778-3.986-3.974-4h-.026zm-12 1c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z`),\n    getSymbolConfig(`profile-symbol`, `M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z`),\n    getSymbolConfig(`settings-symbol`, `M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z`),\n    getSymbolConfig(`menu-symbol`, `M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z`),\n    getSymbolConfig(`notifications-symbol`, `M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z`),\n    getSymbolConfig(`search-symbol`, `M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z`),\n    getSymbolConfig(`refresh-symbol`, `M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z`),\n    getSymbolConfig(`add-symbol`, `M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10`),\n    getSymbolConfig(`remove-symbol`, `M0 10h24v4h-24z`)\n  ]\n};\n\n\n//# sourceURL=webpack:///./src/components/getSvgContentConfig.js?");

/***/ }),

/***/ "./src/data/randomData.js":
/*!********************************!*\
  !*** ./src/data/randomData.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const loop = __webpack_require__(/*! ../utilities/loop */ \"./src/utilities/loop.js\");\n\nconst pangramList = [\n  `The quick, brown fox jumps over a lazy dog.`,\n  `DJs flock by when MTV ax quiz prog.`,\n  `Junk MTV quiz graced by fox whelps.`,\n  `Bawds jog, flick quartz, vex nymphs.`,\n  `Waltz, bad nymph, for quick jigs vex!`,\n  `Fox nymphs grab quick-jived waltz.`,\n  `Brick quiz whangs jumpy veldt fox.`,\n  `Bright vixens jump; dozy fowl quack.`,\n  `Quick wafting zephyrs vex bold Jim.`,\n  `Quick zephyrs blow, vexing daft Jim.`,\n  `Sex-charged fop blew my junk TV quiz.`,\n  `How quickly daft jumping zebras vex.`,\n  `Two driven jocks help fax my big quiz.`,\n  `Quick, Baz, get my woven flax jodhpurs!`,\n  `\"Now fax quiz Jack!\" my brave ghost pled.`,\n  `Five quacking zephyrs jolt my wax bed.`,\n  `Flummoxed by job, kvetching W. zaps Iraq.`,\n  `Cozy sphinx waves quart jug of bad milk.`,\n  `A very bad quack might jinx zippy fowls.`,\n  `Few quips galvanized the mock jury box.`,\n  `Quick brown dogs jump over the lazy fox.`,\n  `The jay, pig, fox, zebra, and my wolves quack!`,\n  `Blowzy red vixens fight for a quick jump.`,\n  `Joaquin Phoenix was gazed by MTV for luck.`,\n  `A wizard’s job is to vex chumps quickly in fog.`,\n  `Watch \"Jeopardy!\", Alex Trebek's fun TV quiz game.`,\n  `Woven silk pyjamas exchanged for blue quartz.`,\n  `Brawny gods just flocked up to quiz and vex him.`,\n  `Adjusting quiver and bow, Zompyc killed the fox.`,\n  `My faxed joke won a pager in the cable TV quiz show.`,\n  `Amazingly few discotheques provide jukeboxes.`,\n  `My girl wove six dozen plaid jackets before she quit.`,\n  `Six big devils from Japan quickly forgot how to waltz.`,\n  `Big July earthquakes confound zany experimental vow.`,\n  `Foxy parsons quiz and cajole the lovably dim wiki-girl.`,\n  `Have a pick: twenty six letters - no forcing a jumbled quiz!`,\n  `Crazy Fredericka bought many very exquisite opal jewels.`,\n  `Sixty zippers were quickly picked from the woven jute bag.`,\n  `A quick movement of the enemy will jeopardize six gunboats.`,\n  `All questions asked by five watch experts amazed the judge.`,\n  `Jack quietly moved up front and seized the big ball of wax.`\n];\n\nmodule.exports = () => {\n  const randomWords = pangramList[Math.floor(Math.random() * pangramList.length)].split(' ');\n\n  return {\n    randomPangram: pangramList[Math.floor(Math.random() * pangramList.length)],\n    randomWord: randomWords[Math.floor(Math.random() * randomWords.length)],\n    randomInteger: Math.floor(Math.random() * 500),\n    randomGuid: loop('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', (key, value) =>\n      value === \"x\" ? (Math.random() * 16 | 0).toString(16) : \"-\")\n  }\n}\n\n//# sourceURL=webpack:///./src/data/randomData.js?");

/***/ }),

/***/ "./src/utilities/keyValuePair.js":
/*!***************************************!*\
  !*** ./src/utilities/keyValuePair.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function kvp(key, value) { this.key = key; this.value = value; };\n\n//# sourceURL=webpack:///./src/utilities/keyValuePair.js?");

/***/ }),

/***/ "./src/utilities/loop.js":
/*!*******************************!*\
  !*** ./src/utilities/loop.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const loopToObject = __webpack_require__(/*! ./loopToObject */ \"./src/utilities/loopToObject.js\");\n\nmodule.exports = (collection, operation) => {\n  const objectResult = loopToObject(collection, operation);\n  if(objectResult == null) return;\n  const resultKeys = Object.keys(objectResult);\n\n  if (hasAllNumericValues(resultKeys)) {\n    const arrayResult = Object.values(objectResult);\n    if (typeof collection === `string` && hasAllStringValues(arrayResult))\n      return getStringFromArray(arrayResult);\n\n    return arrayResult;\n  }\n\n  return objectResult;\n}\n\nconst hasAllNumericValues = keyArray => keyArray.every(isFinite)\nconst hasAllStringValues = array => array.every(value => typeof value === `string`);\nconst getStringFromArray = array => array.join(``);\n\n\n//# sourceURL=webpack:///./src/utilities/loop.js?");

/***/ }),

/***/ "./src/utilities/loopToObject.js":
/*!***************************************!*\
  !*** ./src/utilities/loopToObject.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const kvp = __webpack_require__(/*! ./keyValuePair */ \"./src/utilities/keyValuePair.js\");\n\nconst defaultOperation = (key, value) => new kvp(key, value);\n\nmodule.exports = (collection, operation = defaultOperation) => {\n  const isCollectionEmpty = !collection || (isNaN(collection) && Object.keys(collection).length == 0);\n  if(isCollectionEmpty) return;\n\n  const isCollectionAnArray = Array.isArray(collection);\n  const isCollectionAnInteger = isFinite(collection);\n\n  if (isCollectionAnInteger) collection = new Array(collection).fill(true);\n\n  let completedIterations = 0;\n  const objectResult = {};\n\n  for (const [key, value] of Object.entries(collection)) {\n    const formattedKey = isCollectionAnArray ? parseInt(key) : key;\n    const iterationResult = operation(formattedKey, value, completedIterations);\n\n    if (iterationResult == null) continue;\n\n    if (iterationResult instanceof kvp)\n      objectResult[iterationResult.key] = iterationResult.value;\n    else objectResult[completedIterations] = iterationResult;\n\n    completedIterations++;\n  }\n\n  return objectResult;\n};\n\n\n//# sourceURL=webpack:///./src/utilities/loopToObject.js?");

/***/ }),

/***/ "./src/utilities/newElement.js":
/*!*************************************!*\
  !*** ./src/utilities/newElement.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const loop = __webpack_require__(/*! ../utilities/loop */ \"./src/utilities/loop.js\");\n\n/**\n * @typedef {Object} elementConfig\n * @property {string} tag - HTML element tag\n * @property {string} xmlns - XML namespace (defaults to http://www.w3.org/1999/xhtml)\n * @property {string} textContent\n * @property {elementConfig[]} children\n */\n\n/**\n * @param {HTMLElement} parent\n * @param {elementConfig} params\n * @returns {HTMLElement | SVGElement}\n*/\nconst newElement = (parent, params = {}) => {\n  const element = document.createElementNS(params.xmlns || `http://www.w3.org/1999/xhtml`, params.tag || `div`);\n  element.textContent = params.textContent || null;\n  loop(params.children, (key, child) => newElement(element, child));\n\n  delete params.xmlns;\n  delete params.tag;\n  delete params.textContent;\n  delete params.children;\n\n  loop(params, (key, value) => element.setAttribute(key, value || ``));\n  return parent.appendChild(element);\n};\n\nmodule.exports = newElement;\n\n\n//# sourceURL=webpack:///./src/utilities/newElement.js?");

/***/ })

/******/ });
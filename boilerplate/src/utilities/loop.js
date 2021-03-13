const kvp = require('./keyValuePair');

module.exports = (collection, operation) => {
  const objectResult = iterate(collection, operation);
  const resultKeys = Object.keys(objectResult);

  if (isListOfArrayKeys(resultKeys))
    return objectResult;

  const arrayResult = Object.values(objectResult);

  if (typeof collection === `string` && isStringArray(arrayResult))
    return getString(arrayResult);

  return arrayResult;
}

const iterate = (collection, operation) => {
  const iterableCollection = new Map(Object.entries(collection));
  let completedIterations = 0;
  const objectResult = {};

  for (const [key, value] of iterableCollection) {
    const iterationResult = operation(key, value, completedIterations);
    completedIterations++;

    if (iterationResult == null) continue;
    if (iterationResult instanceof kvp) {
      objectResult[iterationResult.key] = iterationResult.value;
    } else {
      objectResult[key] = iterationResult;
    }
  }

  return objectResult;
};

const isListOfArrayKeys = (keys) => !keys.some(isNaN) || keys.indexOf(`0`);

const isStringArray = (array) => array.some(value => typeof value === `string`);

const getString = (array) => array.join(``);
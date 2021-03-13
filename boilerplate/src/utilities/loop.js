const kvp = require('./keyValuePair');

module.exports = (collection, operation = (key, value) => new kvp(key, value)) => {
  const objectResult = iterate(collection, operation);
  const resultKeys = Object.keys(objectResult);

  if (hasAnyNonNumericValue(resultKeys) || (hasNoZeroValue(resultKeys) && !Array.isArray(collection)))
    return objectResult;

  const arrayResult = Object.values(objectResult);
  if (typeof collection === `string` && hasAllStringValues(arrayResult))
    return getStringFromArray(arrayResult);

  return arrayResult;
}

const iterate = (collection, operation) => {
  const isCollectionAnArray = Array.isArray(collection);
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

const hasAnyNonNumericValue = keyArray => keyArray.some(isNaN)
const hasNoZeroValue = keyArray => keyArray.indexOf(`0`) === -1;
const hasAllStringValues = array => array.every(value => typeof value === `string`);
const getStringFromArray = array => array.join(``);

const loopToObject = require('./loopToObject');

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

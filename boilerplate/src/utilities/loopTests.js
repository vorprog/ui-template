const loop = require('./loop');
const kvp = require('./keyValuePair');

const evenNumbers = [2, 4, 6, 8, 10];
const words = ["foo", "bar"];
const car = {
  make: 'Tesla',
  model: 'Cyber Truck',
  year: '2021',
  stock: 100,
  isElectric: true
};

const arrayResult = loop(evenNumbers, (key, value, completedIterations) => [key, value, completedIterations]);
console.log(`array result: ${JSON.stringify(arrayResult)}`);

const kvpResult = loop(evenNumbers, (key, value) => [key * 5, value]);
console.log(`kvp array result:`)
console.log(JSON.stringify(kvpResult));

const filterArrayResult = loop(evenNumbers, (key, value, completedIterations) => (value > 6 ? { fla: key, whoa: completedIterations, blee: "bla", v: value } : null));
console.log(`filter array result:`)
console.log(JSON.stringify(filterArrayResult));

const objectResults = loop(car, (key, value, completedIterations) => evenNumbers[completedIterations]);
console.log(`object result:`)
console.log(JSON.stringify(objectResults));

const kvpObjectResult = loop(car, (key, value) => new kvp(key, value));
console.log(`kvp object result:`)
console.log(JSON.stringify(kvpObjectResult));
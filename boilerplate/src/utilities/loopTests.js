const loop = require('./loop');
const kvp = require('./keyValuePair');

const evenNumbers = [2, 4, 6, 8, 10];
const words = ["foo", "bar", "blee", "bla", "meh"];

const car1 = {
  make: `Tesla`,
  model: `Cyber Truck`,
  year: `2021`,
  stock: 100,
  isElectric: true
};

const car2 = {
  make: `Ford`,
  model: `Mustang`,
  year: `1966`,
  stock: 7,
  isElectric: false
};

const evenNumbersDoubled = loop(evenNumbers, (key, value) => value*2);
console.log(`even numbers doubled  >>> ${JSON.stringify(evenNumbersDoubled)}`);

const sortedArray = loop(evenNumbers, (key, value) => new kvp(evenNumbers.length - (key+1), value));
console.log(`reverse sorted array  >>> ${JSON.stringify(sortedArray)}`);

const filteredArray = loop(evenNumbers, (key, value) => (value > 6 ? value : null));
console.log(`filtered array  >>> ${JSON.stringify(filteredArray)}`);

const randomWordValues = loop(car1, (key, value, completedIterations) => words[completedIterations]);
console.log(`random word values >>> ${JSON.stringify(randomWordValues)}`);

const changeValues = loop(car1, key => car2[key]);
console.log(`changed values >>> ${JSON.stringify(changeValues)}`);

const remapValues = loop(car1, (key, value, completedIterations) => new kvp(words[completedIterations], value));
console.log(`re-mapped values >>> ${JSON.stringify(remapValues)}`);

import _ from 'lodash';

export default (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const strings = sortedKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!_.has(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (obj2[key] === obj1[key]) {
      return `    ${key}: ${obj2[key]}`;
    }

    return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
  });

  const resultStr = strings.join('\n');

  return `{\n${resultStr}\n}`;
};

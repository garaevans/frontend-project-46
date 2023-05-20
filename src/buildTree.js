import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  return allKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, value: buildTree(obj1[key], obj2[key]), type: 'nested' };
    }
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'removed' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, oldValue: obj1[key], newValue: obj2[key], type: 'changed',
      };
    }

    return { key, value: obj1[key], type: 'unchanged' };
  });
};

export default buildTree;

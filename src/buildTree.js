import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  return allKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'hasChildren', children: buildTree(obj1[key], obj2[key]) };
    }

    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }

    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'updated', oldValue: obj1[key], newValue: obj2[key],
      };
    }

    return { key, type: 'unchanged', value: obj1[key] };
  });
};

export default buildTree;

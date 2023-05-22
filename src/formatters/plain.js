import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return `${value}`;
};

const formatAsPlain = (tree) => {
  const iter = (node, parentPath) => {
    const lines = node.flatMap(({
      key, value, oldValue, newValue, type,
    }) => {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      switch (type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(value)}`;
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(value, currentPath);
        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });

    return lines.join('\n');
  };

  return iter(tree, '');
};

export default formatAsPlain;

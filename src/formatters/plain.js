import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const formatAsPlain = (tree) => {
  const iter = (node, parentPath) => {
    const lines = node.flatMap((item) => {
      const currentPath = parentPath ? `${parentPath}.${item.key}` : item.key;

      switch (item.type) {
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(item.value)}`;
        case 'updated':
          return `Property '${currentPath}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(item.children, currentPath);
        default:
          throw new Error(`Unknown node type: ${item.type}`);
      }
    });

    return lines.join('\n');
  };

  return iter(tree, '');
};

export default formatAsPlain;

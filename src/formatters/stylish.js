import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const makeIndent = (depth, leftShift = 0) => replacer.repeat(depth * spacesCount - leftShift);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return `${data}`;
  }

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${makeIndent(depth)}${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${makeIndent(depth, 4)}}`,
  ].join('\n');
};

const formatAsStylish = (tree) => {
  const iter = (node, depth) => {
    const lines = node.map(({
      key, type, value, oldValue, newValue, children,
    }) => {
      switch (type) {
        case 'removed':
          return `${makeIndent(depth, 2)}- ${key}: ${stringify(value, depth + 1)}`;
        case 'added':
          return `${makeIndent(depth, 2)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'updated':
          return [
            `${makeIndent(depth, 2)}- ${key}: ${stringify(oldValue, depth + 1)}`,
            `${makeIndent(depth, 2)}+ ${key}: ${stringify(newValue, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${makeIndent(depth)}${key}: ${stringify(value, depth + 1)}`;
        case 'nested':
          return `${makeIndent(depth)}${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });

    return [
      '{',
      ...lines,
      `${makeIndent(depth, 4)}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default formatAsStylish;

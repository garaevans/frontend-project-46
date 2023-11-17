import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const makeIndent = (depth, leftShift = 0) => replacer.repeat(depth * spacesCount - leftShift);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
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
    const lines = node.map((item) => {
      switch (item.type) {
        case 'removed':
          return `${makeIndent(depth, 2)}- ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'added':
          return `${makeIndent(depth, 2)}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'updated':
          return [
            `${makeIndent(depth, 2)}- ${item.key}: ${stringify(item.value1, depth + 1)}`,
            `${makeIndent(depth, 2)}+ ${item.key}: ${stringify(item.value2, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${makeIndent(depth)}${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'nested':
          return `${makeIndent(depth)}${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          throw new Error(`Unknown node type: ${item.type}`);
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

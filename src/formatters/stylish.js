import _ from 'lodash';

const space = ' ';
const spacesCount = 4;

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const indent = space.repeat(depth * spacesCount);
  const bracketIndent = space.repeat((depth - 1) * spacesCount);

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent}${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const formatAsStylish = (tree) => {
  const iter = (node, depth) => {
    const indent = space.repeat(depth * spacesCount);
    const shortIndent = space.repeat(spacesCount * depth - 2);
    const bracketIndent = space.repeat((depth - 1) * spacesCount);

    const lines = node.map(({
      key, type, value, oldValue, newValue, children,
    }) => {
      switch (type) {
        case 'removed':
          return `${shortIndent}- ${key}: ${stringify(value, depth + 1)}`;
        case 'added':
          return `${shortIndent}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'updated':
          return [
            `${shortIndent}- ${key}: ${stringify(oldValue, depth + 1)}`,
            `${shortIndent}+ ${key}: ${stringify(newValue, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${indent}${key}: ${stringify(value, depth + 1)}`;
        case 'hasChildren':
          return `${indent}${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default formatAsStylish;

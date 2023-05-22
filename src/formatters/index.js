import formatAsStylish from './stylish.js';
import formatAsPlain from './plain.js';

const format = (data, formatter) => {
  switch (formatter) {
    case 'stylish':
      return formatAsStylish(data);
    case 'plain':
      return formatAsPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown output format: ${formatter}`);
  }
};

export default format;

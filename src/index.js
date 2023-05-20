import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import formatAsStylish from './formatters/stylish.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getExtention = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2) => {
  const data1 = getData(getAbsolutePath(filepath1));
  const data2 = getData(getAbsolutePath(filepath2));

  const obj1 = parse(data1, getExtention(filepath1));
  const obj2 = parse(data2, getExtention(filepath2));

  const tree = buildTree(obj1, obj2);

  return formatAsStylish(tree);
};

import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const getData = (filePath) => fs.readFileSync(filePath, 'utf-8');
const getExtension = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = getData(getAbsolutePath(filePath1));
  const data2 = getData(getAbsolutePath(filePath2));

  const object1 = parse(data1, getExtension(filePath1));
  const object2 = parse(data2, getExtension(filePath2));

  const tree = buildTree(object1, object2);

  return format(tree, formatter);
};

export default genDiff;

import fs from 'fs';
import path from 'path';
import genDiff from './genDiff.js';
import parse from './parsers.js';

export default (filepath1, filepath2) => {
  const getAbsolutePath = (filepath) => path.resolve(filepath);
  const getData = (filepath) => fs.readFileSync(filepath, 'utf-8');
  const getExtention = (filepath) => path.extname(filepath);

  const data1 = getData(getAbsolutePath(filepath1));
  const data2 = getData(getAbsolutePath(filepath2));

  const obj1 = parse(data1, getExtention(filepath1));
  const obj2 = parse(data2, getExtention(filepath2));

  return genDiff(obj1, obj2);
};

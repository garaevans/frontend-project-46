import fs from 'fs';
import path from 'path';
import genDiff from './genDiff.js';

export default (filepath1, filepath2) => {
  const getAbsolutePath = (filepath) => path.resolve(filepath);
  const getData = (filepath) => fs.readFileSync(filepath, 'utf-8');

  const data1 = getData(getAbsolutePath(filepath1));
  const data2 = getData(getAbsolutePath(filepath2));

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  return genDiff(obj1, obj2);
};

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe.each([['stylish'], ['plain'], ['json']])('%s format', (formatter) => {
  const filePath = getFixturePath(`${formatter}Output.txt`);
  const expected = fs.readFileSync(filePath, 'utf-8');

  test.each([['json'], ['yml']])('%s files', (extension) => {
    const filePath1 = getFixturePath(`file1.${extension}`);
    const filePath2 = getFixturePath(`file2.${extension}`);

    const actual = genDiff(filePath1, filePath2, formatter);

    expect(actual).toBe(expected);
  });
});

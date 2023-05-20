import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');

const yamlFile1 = getFixturePath('file1.yml');
const yamlFile2 = getFixturePath('file2.yml');

const expectedStylish = fs.readFileSync(getFixturePath('expectedStylish.txt'), 'utf-8');

describe('generate difference', () => {
  test('json files', () => {
    expect(genDiff(jsonFile1, jsonFile2)).toBe(expectedStylish);
  });

  test('yaml files', () => {
    expect(genDiff(yamlFile1, yamlFile2)).toBe(expectedStylish);
  });
});

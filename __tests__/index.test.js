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

const stylishOutput = fs.readFileSync(getFixturePath('stylishOutput.txt'), 'utf-8');
const plainOutput = fs.readFileSync(getFixturePath('plainOutput.txt'), 'utf-8');
const jsonOutput = fs.readFileSync(getFixturePath('jsonOutput.txt'), 'utf-8');

describe('generate difference', () => {
  test('stylish format', () => {
    expect(genDiff(jsonFile1, jsonFile2)).toBe(stylishOutput);
    expect(genDiff(yamlFile1, yamlFile2)).toBe(stylishOutput);
  });

  test('plain format', () => {
    expect(genDiff(jsonFile1, jsonFile2, 'plain')).toBe(plainOutput);
    expect(genDiff(yamlFile1, yamlFile2, 'plain')).toBe(plainOutput);
  });

  test('json format', () => {
    expect(genDiff(jsonFile1, jsonFile2, 'json')).toBe(jsonOutput);
    expect(genDiff(yamlFile1, yamlFile2, 'json')).toBe(jsonOutput);
  });
});

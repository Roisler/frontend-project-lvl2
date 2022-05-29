import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import yml from 'js-yaml';

import genDiff from '../src/gendiff.js';
import { parseFile } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');
const result = readFile('nested.txt');
const file1 = 'file1.json';
const file2 = 'file2.json';
const file3 = 'file1.yml';
const file4 = 'file2.yml';
test('gendiff', () => {
  expect(genDiff(file1, file2)).toEqual(result);
  expect(genDiff(file3, file4)).toEqual(result);
  expect(genDiff('')).toEqual('');
  expect(genDiff('', file2)).toEqual('');
  expect(genDiff(file1, '')).toEqual('');
  expect(genDiff(file1, file2, 'boom')).toEqual('Error');
});

test('parsers', () => {
  expect(parseFile(readFile(file3), '.yml')).toEqual(yml.load(readFile(file3)));
  expect(parseFile(readFile(file2), '.json')).toEqual(JSON.parse(readFile(file2)));
  expect(parseFile(readFile(file2), '.ini')).toEqual(JSON.parse(readFile(file2)));
});

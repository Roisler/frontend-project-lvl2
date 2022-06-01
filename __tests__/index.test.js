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

const resultStylish = readFile('stylish.txt');
const resultPlain = readFile('plain.txt');

const file1 = 'file1.json';
const file2 = 'file2.json';
const file3 = 'file1.yml';
const file4 = 'file2.yml';

test('gendiff', () => {
  expect(genDiff(file1, file2)).toEqual(resultStylish);
  expect(genDiff(file3, file4)).toEqual(resultStylish);
  expect(genDiff(file1, file2, 'plain')).toEqual(resultPlain);
  expect(genDiff('')).toEqual('Specify the file to be compared');
  expect(genDiff('', file2)).toEqual('Specify the file to be compared');
  expect(genDiff(file1, '')).toEqual('Specify the file to be compared');
  expect(genDiff(file1, file2, 'boom')).toEqual('Unknown format');
});

test('parsers', () => {
  expect(parseFile(readFile(file3), '.yml')).toEqual(yml.load(readFile(file3)));
  expect(parseFile(readFile(file2), '.json')).toEqual(JSON.parse(readFile(file2)));
  expect(parseFile(readFile(file2), '.ini')).toEqual(JSON.parse(readFile(file2)));
});

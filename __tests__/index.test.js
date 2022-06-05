import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const resultStylish = readFile(getFixturePath('stylish.txt'));
const resultPlain = readFile(getFixturePath('plain.txt'));
const resultJSON = readFile(getFixturePath('json.json'));

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const filepath3 = getFixturePath('file1.yml');
const filepath4 = getFixturePath('file2.yml');

test('gendiff', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(resultStylish);
  expect(genDiff(filepath3, filepath4, 'stylish')).toEqual(resultStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(resultPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(resultJSON);
  expect(genDiff(filepath1, filepath2, 'boom')).toEqual('Unknown format');
});

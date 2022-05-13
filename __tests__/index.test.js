import yml from 'js-yaml';
import { readFileSync } from 'fs';
import genDiff from '../src/gendiff.js';
import { parseFile } from '../src/parsers.js';
import getFixturePath from '../src/getFixturePath.js';

const file1 = 'file1.json';

const file2 = 'file2.json';
const file4 = readFileSync(getFixturePath('file1.json'), 'utf-8');
const file3 = readFileSync(getFixturePath('file1.yml'), 'utf-8');

test('gendiff', () => {
  expect(genDiff(file1, file2)).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
  expect(genDiff('')).toEqual('');
  expect(genDiff('', file2)).toEqual('');
  expect(genDiff(file1, '')).toEqual('');
});

test('parsers', () => {
  expect(parseFile(file3, '.yml')).toEqual(yml.load(file3));
  expect(parseFile(file4, '.json')).toEqual(JSON.parse(file4));
  expect(parseFile(file4, '.ini')).toEqual(JSON.parse(file4));
});

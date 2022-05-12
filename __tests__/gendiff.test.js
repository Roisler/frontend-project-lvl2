import genDiff from '../src/gendiff.js';

const file1 = 'file1.json';

const file2 = 'file2.json';

test('gendiff', () => {
  expect(genDiff(file1, file2)).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
  expect(genDiff('')).toEqual('');
  expect(genDiff('', file2)).toEqual('');
  expect(genDiff(file1, '')).toEqual('');
});

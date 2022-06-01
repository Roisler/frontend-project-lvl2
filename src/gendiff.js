import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';
import { format, parseFile } from './parsers.js';
import getDiffOfFormat from './formatters/index.js';

const getFixturePath = (filename) => resolve(cwd(), './__fixtures__/', filename);

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  if (filepath1 === '' || filepath2 === '') {
    return 'Specify the file to be compared';
  }
  const file1 = parseFile(readFileSync(getFixturePath(filepath1), 'utf-8'), format(filepath1));
  const file2 = parseFile(readFileSync(getFixturePath(filepath2), 'utf-8'), format(filepath2));
  return getDiffOfFormat(file1, file2, formatter);
};

export default genDiff;

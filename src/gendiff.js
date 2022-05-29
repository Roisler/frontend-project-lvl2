import { readFileSync } from 'fs';
import getFixturePath from './getFixturePath.js';
import { format, parseFile } from './parsers.js';
import stylish from './stylish.js';
import newAst from './newAst.js';

const genDiff = (filepath1, filepath2, formatter) => {
  if (filepath1 === '' || filepath2 === '') {
    return '';
  }
  const file1 = parseFile(readFileSync(getFixturePath(filepath1), 'utf-8'), format(filepath1));
  const file2 = parseFile(readFileSync(getFixturePath(filepath2), 'utf-8'), format(filepath2));
  if (formatter === 'stylish') {
    return stylish(newAst(file1, file2));
  }
  return 'Error';
};

export default genDiff;

import _ from 'lodash';
import { readFileSync } from 'fs';
import getFixturePath from './getFixturePath.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFileSync(getFixturePath(filepath1), 'utf-8'));
  const file2 = JSON.parse(readFileSync(getFixturePath(filepath2), 'utf-8'));
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));
  let result = '';

  keys.forEach((key) => {
    if (!_.has(file2, key)) {
      result += `  - ${key}: ${file1[key]}\n`;
    } else if (!_.has(file1, key)) {
      result += `  + ${key}: ${file2[key]}\n`;
    } else if (file1[key] !== file2[key]) {
      result += `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
    } else {
      result += `    ${key}: ${file1[key]}\n`;
    }
  });
  /* for (const key of keys) {
    if (!_.has(file2, key)) {
      result += `  - ${key}: ${file1[key]}\n`;
    } else if (!_.has(file1, key)) {
      result += `  + ${key}: ${file2[key]}\n`;
    } else if (file1[key] !== file2[key]) {
      result += `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
    } else {
      result += `    ${key}: ${file1[key]}\n`;
    }
  } */
  result = `{\n${result.trimEnd()}\n}`;
  console.log(result);
  return result;
};

export default genDiff;

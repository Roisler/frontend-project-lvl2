import { readFileSync } from 'fs';
import path from 'path';
import parseData from './parsers.js';
import getDiffOfFormat from './formatters/index.js';
import buildAst from './buildAst.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getParsedData = (filepath) => {
  const dataType = path.extname(filepath).substring(1);
  const data = readFileSync(getFullPath(filepath), 'utf-8');
  return parseData(data, dataType);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);
  const ast = buildAst(parsedData1, parsedData2);
  return getDiffOfFormat(ast, formatter);
};

export default genDiff;

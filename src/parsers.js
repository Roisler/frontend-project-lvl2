import path from 'path';
import yml from 'js-yaml';

export const format = (file) => path.extname(file);

export const parseFile = (file, formatFile) => {
  if (formatFile === '.yaml' || formatFile === '.yml') {
    return yml.load(file);
  }
  if (formatFile === '.json' || formatFile === '') {
    return JSON.parse(file);
  }
  return JSON.parse(file);
};

import newAst from '../newAst.js';
import stylish from './stylish.js';
import plain from './plain.js';

export default (file1, file2, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(newAst(file1, file2));
    case 'plain':
      return plain(newAst(file1, file2));
    case 'json':
      return JSON.stringify(newAst(file1, file2));
    default:
      return 'Unknown format';
  }
};

import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (ast, formatter) => {
  if (formatters[formatter]) {
    return formatters[formatter](ast);
  }
  return 'Unknown format';
};

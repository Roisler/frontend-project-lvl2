import yml from 'js-yaml';

const formats = {
  yml: yml.load,
  yaml: yml.load,
  json: JSON.parse,
};

const parseData = (data, dataType) => formats[dataType](data);

export default parseData;

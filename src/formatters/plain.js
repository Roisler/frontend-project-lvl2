import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const result = node.flatMap((element) => {
      if (element.controlChanged === 'added') {
        const fullPath = path + element.key;
        const val = stringify(element.value);
        return `Property '${fullPath}' was added with value: ${val}`;
      }
      if (element.controlChanged === 'removed') {
        const fullPath = path + element.key;
        return `Property '${fullPath}' was removed`;
      }
      if (element.controlChanged === 'unchanged') {
        return '';
      }
      if (element.controlChanged === 'changed') {
        const value1 = stringify(element.value1);
        const value2 = stringify(element.value2);
        const fullPath = path + element.key;
        return `Property '${fullPath}' was updated. From ${value1} to ${value2}`;
      }
      if (element.controlChanged === 'nested') {
        return iter(element.children, `${path}${element.key}.`);
      }
      return '';
    })
      .filter((element) => (element !== ''));
    return result.join('\n');
  };
  return iter(tree, '');
};

export default plain;

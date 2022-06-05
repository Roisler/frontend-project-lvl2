import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (tree, depth = 1) => {
  if (!_.isPlainObject(tree)) {
    return `${tree}`;
  }
  const result = Object.entries(tree).map(([key, value]) => {
    const sortedValue = `${stringify(value, depth + 1)}`;
    return `${indent(depth + 1)}  ${key}: ${sortedValue}`;
  });
  return `{\n${result.join('\n')}\n${indent(depth)}  }`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const result = node.map((element) => {
      if (element.controlChanged === 'added') {
        const value = stringify(element.value, depth);
        return `${indent(depth)}+ ${element.key}: ${value}`;
      }
      if (element.controlChanged === 'removed') {
        const value = stringify(element.value, depth);
        return `${indent(depth)}- ${element.key}: ${value}`;
      }
      if (element.controlChanged === 'unchanged') {
        const value = stringify(element.value, depth + 1);
        return `${indent(depth)}  ${element.key}: ${value}`;
      }
      if (element.controlChanged === 'changed') {
        const value1 = stringify(element.value1, depth);
        const value2 = stringify(element.value2, depth);
        return `${indent(depth)}- ${element.key}: ${value1}\n${indent(depth)}+ ${element.key}: ${value2}`;
      }
      if (element.controlChanged === 'nested') {
        return `${indent(depth)}  ${element.key}: {\n${iter(element.children, depth + 1)}\n${indent(depth)}  }`;
      }
      return '';
    });
    return result.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;

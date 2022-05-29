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

const treeToStr = (tree) => {
  const iter = (node, depth) => {
    const result = node.map((element) => {
      if (element.controlChanged === 'added') {
        const val = stringify(element.value, depth);
        return `${indent(depth)}+ ${element.key}: ${val}`;
      }
      if (element.controlChanged === 'removed') {
        const val = stringify(element.value, depth);
        return `${indent(depth)}- ${element.key}: ${val}`;
      }
      if (element.controlChanged === 'unchanged') {
        const val = stringify(element.value, depth + 1);
        return `${indent(depth)}  ${element.key}: ${val}`;
      }
      if (element.controlChanged === 'changed') {
        const [oldValue, newValue] = element.value;
        const oldVal = stringify(oldValue, depth);
        const newVal = stringify(newValue, depth);
        return `${indent(depth)}- ${element.key}: ${oldVal}\n${indent(depth)}+ ${element.key}: ${newVal}`;
      }
      if (element.controlChanged === 'nested') {
        return `${indent(depth)}  ${element.key}: {\n${iter(element.value, depth + 1)}\n${indent(depth)}  }`;
      }
      return '';
    });
    return result.join('\n');
  };
  return iter(tree, 1);
};

const addBrace = (str) => `{\n${str.trimEnd()}\n}`;

const stylish = (tree) => addBrace(treeToStr(tree));

export default stylish;

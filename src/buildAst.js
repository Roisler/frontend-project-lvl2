import _ from 'lodash';

const buildAst = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const resultArr = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { key, value: value2, controlChanged: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: value1, controlChanged: 'removed' };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      const children = buildAst(value1, value2);
      return { key, children, controlChanged: 'nested' };
    }
    if (value1 !== value2) {
      return {
        key,
        value1,
        value2,
        controlChanged: 'changed',
      };
    }
    return { key, value: value1, controlChanged: 'unchanged' };
  });
  return resultArr;
};

export default buildAst;

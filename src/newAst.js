import _ from 'lodash';

const newAst = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const resultArr = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      const controlChanged = 'added';
      const value = value2;
      return { key, value, controlChanged };
    }
    if (!_.has(data2, key)) {
      const controlChanged = 'removed';
      const value = value1;
      return { key, value, controlChanged };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      const controlChanged = 'nested';
      const children = newAst(value1, value2);
      return { key, children, controlChanged };
    }
    if (value1 !== value2) {
      const controlChanged = 'changed';
      return {
        key,
        value1,
        value2,
        controlChanged,
      };
    }
    const controlChanged = 'unchanged';
    const value = value1;
    return { key, value, controlChanged };
  });
  return resultArr;
};

export default newAst;

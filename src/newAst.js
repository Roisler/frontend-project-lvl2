import _ from 'lodash';

const newAst = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const resultArr = keys.flatMap((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (!_.has(file1, key)) {
      const controlChanged = 'added';
      const value = value2;
      return { key, value, controlChanged };
    }
    if (!_.has(file2, key)) {
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
      const newValue = value2;
      const oldValue = value1;
      const value = [oldValue, newValue];
      return {
        key,
        value,
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

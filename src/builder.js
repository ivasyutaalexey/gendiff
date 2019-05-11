import _ from 'lodash';

const processValue = value => (typeof value === 'undefined' ? null : value);

const types = [
  {
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])),
    generateNode: (obj1, obj2, key, fn) => ({
      name: key,
      valueBefore: null,
      valueAfter: null,
      children: fn(obj1[key], obj2[key]),
      status: 'unchanged',
    }),
  },
  {
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    generateNode: (obj1, obj2, key) => ({
      name: key,
      valueBefore: processValue(obj1[key]),
      valueAfter: processValue(obj2[key]),
      children: [],
      status: 'added',
    }),
  },
  {
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    generateNode: (obj1, obj2, key) => ({
      name: key,
      valueBefore: processValue(obj1[key]),
      valueAfter: processValue(obj2[key]),
      children: [],
      status: 'removed',
    }),
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    generateNode: (obj1, obj2, key) => ({
      name: key,
      valueBefore: processValue(obj1[key]),
      valueAfter: processValue(obj2[key]),
      children: [],
      status: 'updated',
    }),
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    generateNode: (obj1, obj2, key) => ({
      name: key,
      valueBefore: processValue(obj1[key]),
      valueAfter: processValue(obj2[key]),
      children: [],
      status: 'unchanged',
    }),
  },
];

const buildAst = (beforeJson, afterJson) => {
  const obj = { ...beforeJson, ...afterJson };

  return Object.keys(obj).map((key) => {
    const type = types.find(({ check }) => check(beforeJson, afterJson, key));
    return type.generateNode(beforeJson, afterJson, key, buildAst);
  });
};

export default buildAst;

import _ from 'lodash';

const builders = [
  {
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])),
    generateNode: (obj1, obj2, key, fn) => ({
      name: key,
      valueBefore: null,
      valueAfter: null,
      children: fn(obj1[key], obj2[key]),
      status: 'node',
    }),
  },
  {
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    generateNode: (obj1, obj2, key) => ({
      name: key,
      valueBefore: null,
      valueAfter: obj2[key],
      children: [],
      status: 'added',
    }),
  },
  {
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    generateNode: (obj1, obj2, key) => ({
      name: key,
      valueBefore: obj1[key],
      valueAfter: null,
      children: [],
      status: 'removed',
    }),
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    generateNode: (obj1, obj2, key) => ({
      name: key,
      valueBefore: obj1[key],
      valueAfter: obj2[key],
      children: [],
      status: 'updated',
    }),
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    generateNode: (obj1, obj2, key) => ({
      name: key,
      valueBefore: obj1[key],
      valueAfter: obj2[key],
      children: [],
      status: 'unchanged',
    }),
  },
];

const buildAst = (beforeJson, afterJson) => {
  const obj = { ...beforeJson, ...afterJson };
  return Object.keys(obj).map((key) => {
    const builder = builders.find(({ check }) => check(beforeJson, afterJson, key));
    return builder.generateNode(beforeJson, afterJson, key, buildAst);
  });
};

export default buildAst;

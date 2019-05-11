import _ from 'lodash';

const Node = (name, valueBefore, valueAfter, children, status) => ({
  name,
  valueBefore,
  valueAfter,
  children,
  status,
});

const builders = [
  {
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])),
    createNode: (obj1, obj2, key, fn) => {
      const children = fn(obj1[key], obj2[key]);
      return Node(key, null, null, children, 'node');
    },
  },
  {
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    createNode: (obj1, obj2, key) => Node(key, null, obj2[key], [], 'added'),
  },
  {
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    createNode: (obj1, obj2, key) => Node(key, obj1[key], null, [], 'removed'),
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    createNode: (obj1, obj2, key) => Node(key, obj1[key], obj2[key], [], 'updated'),
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    createNode: (obj1, obj2, key) => Node(key, obj1[key], obj2[key], [], 'unchanged'),
  },
];

const buildAst = (beforeJson, afterJson) => {
  const obj = { ...beforeJson, ...afterJson };
  return Object.keys(obj).map((key) => {
    const builder = builders.find(({ check }) => check(beforeJson, afterJson, key));
    return builder.createNode(beforeJson, afterJson, key, buildAst);
  });
};

export default buildAst;

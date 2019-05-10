import _ from 'lodash';

const types = [
  {
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])),
    generateNode: (obj1, obj2, key) => ({
      name: key,
      value: null,
      children: buildAst(obj1[key], obj2[key]),
      status: 'not_changed',
    }),
  },
  {
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    generateNode: (obj1, obj2, key) => ({
      name: key,
      value: obj2[key],
      children: [],
      status: 'added',
    }),
  },
  {
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    generateNode: (obj1, obj2, key) => ({
      name: key,
      value: obj1[key],
      children: [],
      status: 'deleted',
    }),
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    generateNode: (obj1, obj2, key) => ({
      name: key,
      value: obj1[key],
      children: [],
      status: 'not_changed',
    }),
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    generateNode: (obj1, obj2, key) => [
      {
        name: key, value: obj1[key], children: [], status: 'deleted',
      },
      {
        name: key, value: obj2[key], children: [], status: 'added',
      },
    ],
  },
];

const buildAst = (beforeJson, afterJson) => {
  const obj = { ...beforeJson, ...afterJson };

  const astNodes = Object.keys(obj).map((key) => {
    const type = types.find(({ check }) => check(beforeJson, afterJson, key));
    return type.generateNode(beforeJson, afterJson, key);
  });

  return _.flatten(astNodes);
};

export default buildAst;

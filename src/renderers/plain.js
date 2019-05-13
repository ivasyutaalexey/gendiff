import _ from 'lodash';

const getValueString = value => (typeof value === 'string' ? `'${value}'` : value);
const formatValue = value => (typeof value === 'object' ? '[complex value]' : getValueString(value));

const statusFormatters = {
  unchanged: () => [],
  node: (property, { children }, fn) => fn(children, property),
  removed: property => `Property '${property}' was removed`,
  added: (property, { valueAfter }) => {
    const value = formatValue(valueAfter);
    return `Property '${property}' was added with value: ${value}`;
  },
  updated: (property, { valueBefore, valueAfter }) => {
    const before = formatValue(valueBefore);
    const after = formatValue(valueAfter);
    return `Property '${property}' was updated from ${before} to ${after}`;
  },
};

const getNewPropertyPath = (oldPropertyPath, propertyName) => (oldPropertyPath === '' ? propertyName : `${oldPropertyPath}.${propertyName}`);

const format = (astNodes) => {
  const iter = (nodes, propertyPath) => {
    const formattedNodes = nodes.map((node) => {
      const newPropertyPath = getNewPropertyPath(propertyPath, node.name);
      return statusFormatters[node.status](newPropertyPath, node, iter);
    });

    return _.flatten(formattedNodes).join('\n');
  };

  return iter(astNodes, '');
};

export default format;

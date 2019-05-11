import _ from 'lodash';

const getValueString = value => (typeof value === 'string' ? `'${value}'` : value);

const statusFormatters = {
  removed: property => `Property '${property}' was removed`,
  added: (property, valueBefore, valueAfter) => {
    const value = typeof valueAfter === 'object' ? '[complex value]' : getValueString(valueAfter);
    return `Property '${property}' was added with value: ${value}`;
  },
  updated: (property, valueBefore, valueAfter) => {
    const before = typeof valueBefore === 'object' ? '[complex value]' : getValueString(valueBefore);
    const after = typeof valueAfter === 'object' ? '[complex value]' : getValueString(valueAfter);

    return `Property '${property}' was updated from ${before} to ${after}`;
  },
  not_changed: () => [],
};

const getNewPropertyPath = (oldPropertyPath, propertyName) => (oldPropertyPath === '' ? propertyName : `${oldPropertyPath}.${propertyName}`);

const format = (astNodes) => {
  const iter = (nodes, propertyPath) => {
    const formattedNodes = nodes.map((node) => {
      const {
        name, valueBefore, valueAfter, children, status,
      } = node;
      let row = '';

      const newPropertyPath = getNewPropertyPath(propertyPath, name);

      if (children.length === 0) {
        row = statusFormatters[status](newPropertyPath, valueBefore, valueAfter);
      } else {
        row = iter(children, newPropertyPath);
      }

      return row;
    });

    return _.flatten(formattedNodes).join('\n');
  };

  return iter(astNodes, '');
};

export default format;

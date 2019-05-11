import _ from 'lodash';

const getTab = level => ' '.repeat(2 * level);

const stringify = (value, depth) => {
  if (typeof value !== 'object') {
    return value;
  }

  const tab = getTab(depth);
  const result = ['{\n'];

  Object.keys(value).map(key => result.push(`${tab}    ${key}: ${value[key]}\n`));
  result.push(`${tab}}`);

  return result.join('');
};

const statusActions = {
  added: (name, valueBefore, valueAfter, children, depth) => {
    const tab = getTab(depth);
    return `${tab}+ ${name}: ${stringify(valueAfter, depth + 1)}\n`;
  },
  removed: (name, valueBefore, valueAfter, children, depth) => {
    const tab = getTab(depth);
    return `${tab}- ${name}: ${stringify(valueBefore, depth + 1)}\n`;
  },
  updated: (name, valueBefore, valueAfter, children, depth) => {
    const tab = getTab(depth);
    return [
      `${tab}- ${name}: ${stringify(valueBefore, depth + 1)}\n`,
      `${tab}+ ${name}: ${stringify(valueAfter, depth + 1)}\n`,
    ];
  },
  unchanged: (name, valueBefore, valueAfter, children, depth, fn) => {
    const tab = getTab(depth);
    let formattedValue;
    if (children.length === 0) {
      formattedValue = valueAfter;
    } else {
      formattedValue = fn(children, depth + 2);
    }

    return `${tab}  ${name}: ${formattedValue}\n`;
  },
};

const format = (astNodes, depth = 1) => {
  const formattedNodes = astNodes.map((node) => {
    const {
      name, valueBefore, valueAfter, children, status,
    } = node;
    return statusActions[status](name, valueBefore, valueAfter, children, depth, format);
  });

  return `{\n${_.flatten(formattedNodes).join('')}${getTab(depth - 1)}}`;
};

export default format;

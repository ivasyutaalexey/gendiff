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
  added: ({ name, valueAfter }, depth) => {
    const tab = getTab(depth);
    return `${tab}+ ${name}: ${stringify(valueAfter, depth + 1)}\n`;
  },
  removed: ({ name, valueBefore }, depth) => {
    const tab = getTab(depth);
    return `${tab}- ${name}: ${stringify(valueBefore, depth + 1)}\n`;
  },
  updated: ({ name, valueBefore, valueAfter }, depth) => {
    const tab = getTab(depth);
    return [
      `${tab}- ${name}: ${stringify(valueBefore, depth + 1)}\n`,
      `${tab}+ ${name}: ${stringify(valueAfter, depth + 1)}\n`,
    ];
  },
  unchanged: ({ name, valueAfter }, depth) => {
    const tab = getTab(depth);
    return `${tab}  ${name}: ${valueAfter}\n`;
  },
  node: ({ name, children }, depth, fn) => {
    const tab = getTab(depth);
    const formattedValue = fn(children, depth + 2);
    return `${tab}  ${name}: ${formattedValue}\n`;
  },
};

const format = (astNodes, depth = 1) => {
  const formattedNodes = astNodes.map(node => statusActions[node.status](node, depth, format));
  return `{\n${_.flatten(formattedNodes).join('')}${getTab(depth - 1)}}`;
};

export default format;

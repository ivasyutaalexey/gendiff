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

const formatters = {
  added: ({ name, valueAfter }, openTab, depth) => `${openTab}+ ${name}: ${stringify(valueAfter, depth + 1)}\n`,
  removed: ({ name, valueBefore }, openTab, depth) => `${openTab}- ${name}: ${stringify(valueBefore, depth + 1)}\n`,
  updated: ({ name, valueBefore, valueAfter }, openTab, depth) => (
    `${openTab}- ${name}: ${stringify(valueBefore, depth + 1)}\n`
    + `${openTab}+ ${name}: ${stringify(valueAfter, depth + 1)}\n`
  ),
  unchanged: ({ name, valueAfter }, openTab) => `${openTab}  ${name}: ${valueAfter}\n`,
  node: ({ name, children }, openTab, depth, fn) => {
    const formattedValue = fn(children, depth + 2);
    return `${openTab}  ${name}: ${formattedValue}\n`;
  },
};

const render = (astNodes, depth = 1) => {
  const openTab = getTab(depth);
  const closeTab = getTab(depth - 1);

  const formattedNodes = astNodes.map((node) => {
    const format = formatters[node.status];
    return format(node, openTab, depth, render);
  });
  return `{\n${_.flatten(formattedNodes).join('')}${closeTab}}`;
};

export default render;

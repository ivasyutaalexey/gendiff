import _ from 'lodash';

const getTab = level => ' '.repeat(2 * level);

const stringify = (value, depth) => {
  if (typeof value !== 'object') {
    return value;
  }

  const tab = getTab(depth);
  const rows = Object.keys(value).map(key => `${tab}    ${key}: ${value[key]}`);
  return ['{', ...rows, `${tab}}`].join('\n');
};

const formatters = {
  added: ({ name, valueAfter }, openTab, depth) => `${openTab}+ ${name}: ${stringify(valueAfter, depth + 1)}`,
  removed: ({ name, valueBefore }, openTab, depth) => `${openTab}- ${name}: ${stringify(valueBefore, depth + 1)}`,
  updated: ({ name, valueBefore, valueAfter }, openTab, depth) => (
    `${openTab}- ${name}: ${stringify(valueBefore, depth + 1)}\n`
    + `${openTab}+ ${name}: ${stringify(valueAfter, depth + 1)}`
  ),
  unchanged: ({ name, valueAfter }, openTab) => `${openTab}  ${name}: ${valueAfter}`,
  node: ({ name, children }, openTab, depth, fn) => {
    const formattedValue = fn(children, depth + 2);
    return `${openTab}  ${name}: ${formattedValue}`;
  },
};

const render = (astNodes, depth = 1) => {
  const openTab = getTab(depth);
  const closeTab = getTab(depth - 1);

  const formattedNodes = astNodes.map((node) => {
    const format = formatters[node.status];
    return format(node, openTab, depth, render);
  });
  return `{\n${_.flatten(formattedNodes).join('\n')}\n${closeTab}}`;
};

export default render;

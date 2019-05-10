const getTab = level => ' '.repeat(2 * level);

const statusSymbols = {
  added: '+',
  deleted: '-',
  not_changed: ' ',
};

export default {
  format(astNodes, depth = 1) {
    const formattedNodes = astNodes.map((node) => {
      const tab = getTab(depth);
      const {
        name, value, children, status,
      } = node;

      const statusSymbol = statusSymbols[status];
      let formattedValue;
      if (children.length === 0) {
        formattedValue = this.stringify(value, depth + 1);
      } else {
        formattedValue = this.format(children, depth + 2);
      }

      return `${tab}${statusSymbol} ${name}: ${formattedValue}\n`;
    });

    return `{\n${formattedNodes.join('')}${getTab(depth - 1)}}`;
  },

  stringify(value, depth) {
    if (typeof value !== 'object') {
      return value;
    }

    const tab = getTab(depth);
    const result = ['{\n'];
    Object.keys(value).map(key => result.push(`${tab}    ${key}: ${value[key]}\n`));
    result.push(`${tab}}`);

    return result.join('');
  },
};

import _ from 'lodash';

export default {
  format(astNodes) {
    const result = astNodes.map((node) => {
      const {
        name, value, children, status,
      } = node;

      return `Property '${name}' was ${status}\n`;
    });

    return _.flatten(result).join('');
  },
};

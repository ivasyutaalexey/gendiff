import formatPlain from './format-plain';
import formatTree from './format-tree';
import formatJson from './format-json';

export default (type) => {
  switch (type) {
    case 'plain':
      return formatPlain;
    case 'tree':
      return formatTree;
    case 'json':
      return formatJson;
    default:
      return formatTree;
  }
};

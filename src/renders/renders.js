import formatPlain from './plain';
import formatTree from './tree';
import formatJson from './json';

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

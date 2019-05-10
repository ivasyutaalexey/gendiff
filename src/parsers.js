import YAML from 'js-yaml';
import INI from 'ini';

const parsers = {
  json: JSON.parse,
  yml: YAML.safeLoad,
  ini: INI.parse,
};

export default (ext, data) => {
  const parse = parsers[ext.slice(1)];
  return parse(data);
};

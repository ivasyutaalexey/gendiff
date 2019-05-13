import YAML from 'js-yaml';
import INI from 'ini';

const parsers = {
  json: JSON.parse,
  yml: YAML.safeLoad,
  ini: INI.parse,
};

export default (format, data) => {
  const parse = parsers[format];
  return parse(data);
};

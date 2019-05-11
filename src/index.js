import path from 'path';
import fs from 'fs';

import parse from './parsers';
import buildAst from './builder';
import formatPlain from './formatters/format-plain';
import formatTree from './formatters/format-tree';
import formatJson from './formatters/format-json';


const getFormatter = (type) => {
  let format;
  switch (type) {
    case 'plain':
      format = formatPlain;
      break;
    case 'tree':
      format = formatTree;
      break;
    case 'json':
      format = formatJson;
      break;
    default:
    // nothing
  }
  return format;
};

const parseConfig = (filepath) => {
  const ext = path.extname(filepath);
  const fileData = fs.readFileSync(filepath, 'utf8');
  return parse(ext, fileData);
};

export default (filePath1, filePath2, outputFormat) => {
  const configBefore = parseConfig(filePath1);
  const configAfter = parseConfig(filePath2);

  const format = getFormatter(outputFormat);
  const ast = buildAst(configBefore, configAfter);

  // console.log(JSON.stringify(ast, null, 2));

  return format(ast);
};

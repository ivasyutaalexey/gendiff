import path from 'path';
import fs from 'fs';

import parse from './parsers';
import buildAst from './builder';
import PlainFormatter from './formatters/PlainFormatter';
import TreeFormatter from './formatters/TreeFormatter';
import JsonFormatter from './formatters/JsonFormatter';


const getFormatter = (type) => {
  let formatter;
  switch (type) {
    case 'plain': formatter = PlainFormatter; break;
    case 'tree': formatter = TreeFormatter; break;
    case 'json': formatter = JsonFormatter; break;
    default:
      // nothing
  }
  return formatter;
};

const getParsedObject = (filepath) => {
  const ext = path.extname(filepath);
  const fileData = fs.readFileSync(filepath, 'utf8');
  return parse(ext, fileData);
};

export default (filePath1, filePath2, outputFormat) => {
  const configBefore = getParsedObject(filePath1);
  const configAfter = getParsedObject(filePath2);
  const format = getFormatter(outputFormat);
  const ast = buildAst(configBefore, configAfter);

  // console.log(JSON.stringify(ast, null, 2));

  return format(ast);
};

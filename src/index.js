import path from 'path';
import fs from 'fs';

import parse from './parsers';
import buildAst from './builder';
import getFormatter from './renders/renders';

const parseFile = (filepath) => {
  const ext = path.extname(filepath);
  const fileData = fs.readFileSync(filepath, 'utf8');
  return parse(ext, fileData);
};

const render = (ast, outputFormat) => getFormatter(outputFormat)(ast);

export default (filePath1, filePath2, outputFormat) => {
  const configBefore = parseFile(filePath1);
  const configAfter = parseFile(filePath2);

  const ast = buildAst(configBefore, configAfter);
  return render(ast, outputFormat);
};

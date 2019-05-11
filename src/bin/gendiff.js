#!/usr/bin/env node

import gendiff from '../index';

const program = require('commander');

program
  .version('0.3.2')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --output-format [type]', 'Output format, available: plain, tree, json', 'tree')
  .parse(process.argv);

if (!program.args.length) {
  console.error('no params given!');
  process.exit(1);
}

const [firstConfig, secondConfig] = program.args;

const diff = gendiff(firstConfig, secondConfig, program.outputFormat);
console.log(diff);

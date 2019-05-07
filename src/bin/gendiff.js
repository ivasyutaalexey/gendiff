#!/usr/bin/env node

import gendiff from '../index';

const program = require('commander');

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!program.args.length) {
  console.error('no params given!');
  process.exit(1);
}

const [firstConfig, secondConfig] = program.args;
console.log(gendiff(firstConfig, secondConfig));

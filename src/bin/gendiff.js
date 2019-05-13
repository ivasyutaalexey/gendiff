#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version('0.3.3')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option(
    '-f, --output-format [type]',
    'Output format, available: plain, tree, json',
    'tree',
  )
  .action((firstConfig, secondConfig, cmd) => {
    const diff = gendiff(firstConfig, secondConfig, cmd.outputFormat);
    console.log(diff);
  });

program.parse(process.argv);

if (!program.args.length) {
  console.error('no params given!');
  process.exit(1);
}

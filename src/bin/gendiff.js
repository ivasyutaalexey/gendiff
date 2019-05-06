#!/usr/bin/env node

let program = require('commander');

program
    .version('0.0.4')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);

if (!program.args.length) program.help();
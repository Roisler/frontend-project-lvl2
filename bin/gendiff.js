#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.2')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2, program.opts().format);
    console.log(result);
  })
  .option('-f, --format <type>', 'output format', 'stylish');
program.parse();

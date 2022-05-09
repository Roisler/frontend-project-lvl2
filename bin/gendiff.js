#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/gendiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.2')
  .arguments('<filepath1> <filepath2')
  .action((filepath1, filepath2) => genDiff(filepath1, filepath2))
  .option('-f, --format <type>', 'output format');
program.parse();

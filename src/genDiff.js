import { Command } from 'commander';
const genDiff = new Command();
genDiff
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
genDiff.parse();

export default genDiff;
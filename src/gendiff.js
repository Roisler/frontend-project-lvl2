import { program } from 'commander';

const genDiff = (filepath1, filepath2) => {
  console.log(filepath1);
  console.log(filepath2);
};

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>', 'Enter filepath')
  .option('-f, --format <type>', 'output format');
program.parse();

export default genDiff;

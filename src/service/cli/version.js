'use strict';

const packageJsonFile = require(`../../../package`);
const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(packageJsonFile.version));
  }
};

'use strict';

const chalk = require(`chalk`);

module.exports = {
  name: `--fill`,
  run() {
    return console.info(chalk.gray(`fill-db command`));
  }
};

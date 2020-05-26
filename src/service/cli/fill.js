'use strict';

const chalk = require(`chalk`);
// const path = require(`path`);
const fs = require(`fs`).promises;
const QueriesBuilder = require(`./fill/builder`);
const QueriesCreator = require(`./fill/creator`);
const QueriesGenerator = require(`./fill/generator`);

const DEFAULT_OFFERS_NUMBER = 5;

module.exports = {
  name: `--fill`,
  async run(args) {
    try {
      const [offersNumberArg] = args;
      const offersNumber = Number(offersNumberArg) || DEFAULT_OFFERS_NUMBER;

      if (offersNumber < DEFAULT_OFFERS_NUMBER) {
        return console.error(chalk.red(`Bad offers count`));
      }

      const queriesBuilder = new QueriesBuilder();
      new QueriesCreator(offersNumber).fillBuilder(queriesBuilder);

      await fs.writeFile(`./fill-test.sql`, new QueriesGenerator(queriesBuilder).generateSQL().getBuiltResult());
    } catch (e) {
      console.log(`err`);
      throw e;
    }

    return console.info(chalk.gray(`fill-db command`));
  }
};

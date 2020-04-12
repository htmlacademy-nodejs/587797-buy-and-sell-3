'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {Router} = require(`express`);

const {
  MOCK_FILE_PATH,
  HttpCode,
  ErrorCode
} = require(`../../constants`);

const searchRouter = new Router();

searchRouter
  .get(`/`, async (req, res) => {
    try {
      const {query} = req.query;

      if (query === undefined || query.length === 0) {
        res.status(HttpCode.NOT_FOUND).send(`There is no search param`);
      }

      const fileContent = await fs.readFile(MOCK_FILE_PATH);
      const mocks = JSON.parse(fileContent);
      res.json(mocks.filter((mock) => mock.title.indexOf(query) !== -1));
    } catch (error) {
      if (error.code === ErrorCode.NO_FILE_OR_DIRECTORY) {
        res.status(HttpCode.NOT_FOUND).send(`There is no data file`);
      } else {
        res.status(HttpCode.INTERNAL_ERROR).send(`Internal error`);
      }

      console.info(chalk.red(error));
    }
  });

module.exports = searchRouter;

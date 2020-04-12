'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {Router} = require(`express`);

const {
  MOCK_FILE_PATH,
  HttpCode,
  ErrorCode
} = require(`../../constants`);

const offersRouter = new Router();

offersRouter.get(`/:id`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(MOCK_FILE_PATH);
    const mocks = JSON.parse(fileContent);
    res.json(mocks.filter((mock) => mock.id === req.params.id)[0]);
  } catch (error) {
    if (error.code === ErrorCode.NO_FILE_OR_DIRECTORY) {
      res.status(HttpCode.NOT_FOUND).send(`There is no data file`);
    } else {
      res.status(HttpCode.INTERNAL_ERROR).send(`Internal error`);
    }

    console.info(chalk.red(error));
  }
});

offersRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(MOCK_FILE_PATH);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (error) {
    if (error.code === ErrorCode.NO_FILE_OR_DIRECTORY) {
      res.status(HttpCode.NOT_FOUND).send(`There is no data file`);
    } else {
      res.status(HttpCode.INTERNAL_ERROR).send(`Internal error`);
    }

    console.info(chalk.red(error));
  }
});

module.exports = offersRouter;

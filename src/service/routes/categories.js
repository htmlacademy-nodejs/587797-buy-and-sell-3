'use strict';

const chalk = require(`chalk`);

const {Router} = require(`express`);
const {getCategories} = require(`../repository`);

const {
  HttpCode,
  ErrorCode
} = require(`../../constants`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    if (error.code === ErrorCode.NO_FILE_OR_DIRECTORY) {
      res.status(HttpCode.NOT_FOUND).send(`There is no data file`);
    } else {
      res.status(HttpCode.INTERNAL_ERROR).send(`Internal error`);
    }

    console.info(chalk.red(error));
  }
});

module.exports = categoriesRouter;

'use strict';

const {getLogger} = require(`../logger`);
const logger = getLogger();

const {Router} = require(`express`);
const CategoriesRepository = require(`../repositories/categoriesRepository`);

const {
  HttpCode,
} = require(`../../constants`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, (req, res) => {
  const response = CategoriesRepository.getAll();

  if (response.isSuccess) {
    res.json(response.body);
    logger.info(`End request with status code ${HttpCode.OK}`);
  } else {
    res.status(HttpCode.NOT_FOUND).send(response.body.message);
    logger.error(`End request with error: ${HttpCode.NOT_FOUND}`);
  }
});

module.exports = categoriesRouter;

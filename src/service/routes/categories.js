'use strict';

const {Router} = require(`express`);
const CategoriesRepository = require(`../repositories/categoriesRepository`);

const {
  HttpCode,
} = require(`../../constants`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, async (req, res) => {
  const response = CategoriesRepository.getAll();

  if (response.isSuccess) {
    res.json(response.body);
  } else {
    res.status(HttpCode.NOT_FOUND).send(response.body.message);
  }
});

module.exports = categoriesRouter;

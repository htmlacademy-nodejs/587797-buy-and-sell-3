'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, categoriesService) => {
  route.use(`/`, async (req, res) => {
    const categories = await categoriesService.findAll();

    if (categories.length === 0) {
      res.status(HttpCode.NOT_FOUND).send(`Not found any categories`);
    } else {
      res.json(categories);
    }
  });

  app.use(`/categories`, route);
};

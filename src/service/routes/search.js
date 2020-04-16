'use strict';

const {Router} = require(`express`);

const OffersRepository = require(`../repositories/offersRepository`);

const {
  HttpCode,
} = require(`../../constants`);

const searchRouter = new Router();

searchRouter
  .get(`/`, async (req, res) => {
    const {query} = req.query;

    if (query === undefined || query.length === 0) {
      res.status(HttpCode.NOT_FOUND).send(`There is no search param`);
    } else {
      const response = OffersRepository.search(query);

      if (response.isSuccess) {
        res.json(response.body);
      } else {
        res.status(HttpCode.NOT_FOUND).send(response.body.message);
      }
    }
  });

module.exports = searchRouter;

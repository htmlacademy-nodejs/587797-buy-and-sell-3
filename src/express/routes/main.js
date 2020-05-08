'use strict';

const axios = require(`axios`);

const {getLogger} = require(`../logger`);
const logger = getLogger();

const {Router} = require(`express`);

const {BASE_API_URL} = require(`../../constants`);

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  try {
    const offersResponse = await axios.get(BASE_API_URL + `/api/offers`);
    const tickets = offersResponse.data;
    const categoriesResponse = await axios.get(BASE_API_URL + `/api/categories`);
    const categories = categoriesResponse.data;

    res.render(`main/main`, {
      categories,
      newTickets: tickets,
      mostCommentedTickets: tickets.sort((a, b) => b.comments.length - a.comments.length)
    });
  } catch (error) {
    console.error(error);
  }
});
mainRouter.get(`/register`, (req, res) => {
  res.render(`main/sign-up`);
});
mainRouter.get(`/login`, (req, res) => {
  res.render(`main/login`);
});
mainRouter.get(`/search`, async (req, res, next) => {
  const search = req.query.search;
  logger.info(`Search query: ${search}`);

  let offers = [];

  try {
    if (search.length !== 0) {
      const response = await axios.get(`${BASE_API_URL}/api/search?query=${encodeURI(search)}`);
      offers = response.data;
    }

    res.render(`main/search-result`, {
      isAuth: true,
      offers
    });
  } catch (error) {
    next(error);
  }
});

module.exports = mainRouter;

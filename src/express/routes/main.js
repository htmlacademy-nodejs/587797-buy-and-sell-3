'use strict';

const axios = require(`axios`);

const {Router} = require(`express`);

const {BASE_API_URL} = require(`../../constants`);

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  try {
    const offersResponse = await axios.get(BASE_API_URL + `/api/offers`);
    const tickets = offersResponse.data;

    res.render(`main/main`, {
      categories: [],
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
mainRouter.get(`/search`, (req, res) => {
  res.render(`main/search-result`, {
    isAuth: true,
    results: [1]
  });
});

module.exports = mainRouter;

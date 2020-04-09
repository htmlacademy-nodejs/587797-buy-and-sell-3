'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => {
  res.render(`main/main`, {
    tickets: [1]
  });
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

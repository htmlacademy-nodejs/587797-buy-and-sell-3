'use strict';

const axios = require(`axios`);

const {BASE_API_URL} = require(`../../constants`);

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const offersResponse = await axios.get(`${BASE_API_URL}/api/offers`);
  const tickets = offersResponse.data;

  res.render(`my/my-tickets`, {
    isAuth: true,
    tickets
  });
});
myRouter.get(`/comments`, (req, res) => {
  res.render(`my/comments`, {
    isAuth: true,
    comments: [1]
  });
});

module.exports = myRouter;

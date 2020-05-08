'use strict';

const axios = require(`axios`);

const {BASE_API_URL} = require(`../../constants`);

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  try {
    const offersResponse = await axios.get(`${BASE_API_URL}/api/offers`);
    const offers = offersResponse.data;

    res.render(`my/my-tickets`, {
      isAuth: true,
      tickets: offers
    });
  } catch (e) {
    console.log(e);
  }
});
myRouter.get(`/comments`, async (req, res) => {
  try {
    const offersResponse = await axios.get(`${BASE_API_URL}/api/offers`);
    const offers = offersResponse.data.slice(0, 3);

    let comments = offers.reduce((accumulator, offer) => accumulator.concat(offer.comments), []);

    res.render(`my/comments`, {
      isAuth: true,
      comments
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = myRouter;

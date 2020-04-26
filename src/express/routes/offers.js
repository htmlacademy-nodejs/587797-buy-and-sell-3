'use strict';

const axios = require(`axios`);

const {Router} = require(`express`);

const {BASE_API_URL} = require(`../../constants`);

const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => {
  res.render(`offers/new-ticket`, {
    isAuth: true
  });
});
offersRouter.get(`/category/:id`, (req, res) => {
  res.render(`offers/category`, {
    isAuth: true
  });
});
offersRouter.get(`/edit/:id`, async (req, res) => {
  try {
    const offerResponse = await axios.get(`${BASE_API_URL}/api/offers/${req.params.id}`);
    const offer = offerResponse.data;

    const categoriesResponse = await axios.get(`${BASE_API_URL}/api/categories`);
    const categories = categoriesResponse.data;

    console.log(offer);

    res.render(`offers/ticket-edit`, {
      isAuth: true,
      ticket: offer,
      categories
    });
  } catch (e) {
    console.log(e);
  }
});
offersRouter.get(`/:id`, async (req, res) => {
  try {
    const offerResponse = await axios.get(BASE_API_URL + `/api/offers/${req.params.id}`);
    const offer = offerResponse.data;

    res.render(`offers/ticket`, {
      isAuth: false,
      comments: [1],
      ticket: offer
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = offersRouter;

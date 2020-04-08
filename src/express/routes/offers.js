'use strict';

const {Router} = require(`express`);

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
offersRouter.get(`/edit/:id`, (req, res) => {
  res.render(`offers/ticket-edit`, {
    isAuth: true
  });
});
offersRouter.get(`/:id`, (req, res) => {
  res.render(`offers/ticket`, {
    isAuth: false,
    ticket: {
      img: null
    },
    comments: [1]
  });
});

module.exports = offersRouter;

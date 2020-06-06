'use strict';

const {Router} = require(`express`);
const categories = require(`./categories`);

const {
  CategoryService,
  // OfferService
} = require(`../data-service`);

const route = new Router();

(async () => {
  categories(route, new CategoryService());
})();

module.exports = route;

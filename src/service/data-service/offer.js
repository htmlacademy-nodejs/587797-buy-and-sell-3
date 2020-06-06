'use strict';

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    return this._offers;
  }

  findOne() {

  }
}

module.exports = OfferService;

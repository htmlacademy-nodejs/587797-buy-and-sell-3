'use strict';

class Builder {
  constructor() {
    this._functions = [];
    this._truncateTables = [];
    this._users = [];
    this._offers = [];
    this._categories = [];
    this._offersComments = [];
    this._offersCategories = [];
  }

  addFunction(fn) {
    this._functions.push(fn);
  }

  addTableForTruncate(table) {
    this._truncateTables.push(table);
  }

  addUser(user) {
    this._users.push(user);
  }

  addOffer(offer) {
    this._offers.push(offer);
  }

  addOffersComment(offersComment) {
    this._offersComments.push(offersComment);
  }

  addCategory(category) {
    this._categories.push(category);
  }

  addOffersCategory(offersCategory) {
    this._offersCategories.push(offersCategory);
  }
}

module.exports = Builder;

'use strict';

module.exports = class EntitiesDTO {
  constructor() {
    this._truncateTables = [];
    this._users = [];
    this._offers = [];
    this._categories = [];
    this._offersComments = [];
    this._offersCategories = [];
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

  getTablesForTruncate() {
    return this._truncateTables;
  }

  get users() {
    return this._users;
  }

  get offers() {
    return this._offers;
  }

  get offersComments() {
    return this._offersComments;
  }

  get categories() {
    return this._categories;
  }

  get offersCategories() {
    return this._offersCategories;
  }
};

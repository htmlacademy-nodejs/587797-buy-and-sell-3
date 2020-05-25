'use strict';

class Generator {
  constructor(builder) {
    this._builder = builder;
    this._result = ``;
  }

  generateSQL() {
    this._add(this._builder._functions.join(`\n`));
    this._add(this._getEmptyLine(2));

    this._add(this._builder._truncateTables.join(`\n`));
    this._add(this._getEmptyLine(2));

    this._add(this._insertIntoUsers());
    this._add(this._getEmptyLine(2));

    this._add(this._insertIntoCategories());
    this._add(this._getEmptyLine(2));

    this._add(this._insertIntoOffers());
    this._add(this._getEmptyLine(2));

    this._add(this._insertIntoOffersComments());
    this._add(this._getEmptyLine(2));

    this._add(this._insertIntoOffersCategories());
  }

  _insertIntoUsers() {
    return `INSERT INTO public.users(user_id, email, password, name, surname, avatar) VALUES(\n${this._builder._users.join(`),\n(`)})`;
  }

  _insertIntoCategories() {
    return `INSERT INTO public.categories(category_id, name) VALUES(\n${this._builder._categories.join(`),\n(`)})`;
  }

  _insertIntoOffers() {
    return `INSERT INTO public.offers(offer_id, title, price, type, description, picture, author_id) VALUES(\n${this._builder._offers.join(`),\n(`)})`;
  }

  _insertIntoOffersComments() {
    return `INSERT INTO public.offers_comments(text, offer_id, author_id) VALUES\n(${this._builder._offersComments.join(`),\n(`)})`;
  }

  _insertIntoOffersCategories() {
    return `INSERT INTO public.offers_categories(offer_id, category_id) VALUES(\n${this._builder._offersCategories.join(`),\n(`)})`;
  }

  _getEmptyLine(quantityOfLines = 1) {
    return Array(quantityOfLines).fill(`\n`).join(``);
  }

  _add(string) {
    this._result += string;
  }

  getBuiltResult() {
    return this._result;
  }
}

module.exports = Generator;

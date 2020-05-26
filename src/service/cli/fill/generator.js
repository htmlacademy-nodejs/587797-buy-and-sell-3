'use strict';

const User = require(`./entities/user`);
const Offer = require(`./entities/offer`);
const OffersComment = require(`./entities/offers-comment`);
const Category = require(`./entities/category`);
const OffersCategory = require(`./entities/offers-category`);

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

    this._add(this._getInsertQuery(User.tableName(), User.fields(), this._builder._users));
    this._add(this._getEmptyLine(2));

    this._add(this._getInsertQuery(Category.tableName(), Category.fields(), this._builder._categories));
    this._add(this._getEmptyLine(2));

    this._add(this._getInsertQuery(Offer.tableName(), Offer.fields(), this._builder._offers));
    this._add(this._getEmptyLine(2));

    this._add(this._getInsertQuery(OffersComment.tableName(), OffersComment.fields(), this._builder._offersComments));
    this._add(this._getEmptyLine(2));

    this._add(this._getInsertQuery(OffersCategory.tableName(), OffersCategory.fields(), this._builder._offersCategories));

    return this;
  }

  _getInsertQuery(tableName, fields, values) {
    return `INSERT INTO public.${tableName}(${fields.join(`, `)}) VALUES\n(${values.join(`),\n(`)})`;
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

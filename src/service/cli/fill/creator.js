'use strict';

const {
  getRandomInt
} = require(`../../../utils`);

const User = require(`./entities/user`);
const Offer = require(`./entities/offer`);
const OffersComment = require(`./entities/offers-comment`);
const Category = require(`./entities/category`);
const OffersCategory = require(`./entities/offers-category`);

class Creator {
  constructor(offersCount) {
    this._offersCount = offersCount;
    this._usersCount = Math.floor(this._offersCount / 2);
    this._categoriesCount = 5;
  }

  static _availableTables() {
    return [
      `users`,
      `categories`,
      `offers`,
      `offers_comments`,
      `offers_categories`
    ];
  }

  fillBuilder(builder) {
    builder.addFunction(this._getEncryptFunction());

    Creator._availableTables().forEach((table) => {
      builder.addTableForTruncate(this._createTruncateTable(table));
    });

    for (let userId = 1; userId <= this._usersCount; userId++) {
      builder.addUser(User.create(userId));
    }

    for (let categoryId = 1; categoryId <= this._categoriesCount; categoryId++) {
      builder.addCategory(Category.create(categoryId));
    }

    for (let offerId = 1; offerId <= this._offersCount; offerId++) {
      const offersUserId = this._getRandomUserId();
      const commentAuthorId = this._getRandomUserExclude(offersUserId);

      builder.addOffer(Offer.create(offerId, offersUserId));
      builder.addOffersComment(OffersComment.create((2 * offerId) - 1), offerId, commentAuthorId);
      builder.addOffersComment(OffersComment.create(2 * offerId), offerId, commentAuthorId);

      this._getRandomCategoriesIds().forEach((categoryId) => {
        builder.addOffersCategory(OffersCategory.create(offerId, categoryId));
      });
    }
  }

  _getEncryptFunction() {
    return `
      -- Function for encrypting primary key
    CREATE OR REPLACE FUNCTION pseudo_encrypt(VALUE int) returns int AS $$
    DECLARE
    l1 int;
    l2 int;
    r1 int;
    r2 int;
    i int:=0;
    BEGIN
     l1:= (VALUE >> 16) & 65535;
     r1:= VALUE & 65535;
     WHILE i < 3 LOOP
       l2 := r1;
       r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
       l1 := l2;
       r1 := r2;
       i := i + 1;
     END LOOP;
     RETURN ((r1 << 16) + l1);
    END;
    $$ LANGUAGE plpgsql strict immutable;`.trim();
  }

  _createTruncateTable(table) {
    return `TRUNCATE TABLE public.${table} CASCADE;`;
  }

  _getRandomUserId() {
    return getRandomInt(1, this._usersCount);
  }

  _getRandomCategoryId() {
    return getRandomInt(1, this._categoriesCount);
  }

  _getRandomUserExclude(userId) {
    const randomUserId = getRandomInt(1, this._usersCount);

    if (userId === randomUserId) {
      return this._getRandomUserExclude(userId);
    }

    return randomUserId;
  }

  _getRandomCategoriesIds() {
    let categoriesIds = [];

    while (categoriesIds.length < this._categoriesCount) {
      const categoryId = this._getRandomCategoryId();

      if (categoriesIds.includes(categoryId)) {
        continue;
      }

      categoriesIds.push(categoryId);
    }

    return categoriesIds;
  }
}

module.exports = Creator;

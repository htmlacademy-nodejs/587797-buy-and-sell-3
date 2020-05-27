'use strict';

const {
  getRandomInt
} = require(`../../../utils`);

const User = require(`./entities/user`);
const Offer = require(`./entities/offer`);
const OffersComment = require(`./entities/offers-comment`);
const Category = require(`./entities/category`);
const OffersCategory = require(`./entities/offers-category`);

const RandomPrice = {
  MIN: 100,
  MAX: 10000
};

module.exports = class Creator {
  constructor(offersCount) {
    this._offersCount = offersCount;
    this._usersCount = Math.floor(this._offersCount / 2);
    this._categoriesCount = 5;
    this._maxCommentsCount = 2;
    this._commentCounter = 1;
  }

  fillBuilder(builder) {
    [
      User.tableName(),
      Category.tableName(),
      Offer.tableName(),
      OffersComment.tableName(),
      OffersCategory.tableName()
    ].forEach((table) => {
      builder.addTableForTruncate(table);
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

      builder.addOffer(Offer.create(offerId, offersUserId, this._getRandomPrice()));

      for (let i = 0; i < getRandomInt(1, this._maxCommentsCount); i++) {
        builder.addOffersComment(OffersComment.create(this._commentCounter, offerId, commentAuthorId));
        ++this._commentCounter;
      }

      this._getRandomCategoriesIds().forEach((categoryId) => {
        builder.addOffersCategory(OffersCategory.create(offerId, categoryId));
      });
    }
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

    while (categoriesIds.length < getRandomInt(1, this._categoriesCount)) {
      const categoryId = this._getRandomCategoryId();

      if (categoriesIds.includes(categoryId)) {
        continue;
      }

      categoriesIds.push(categoryId);
    }

    return categoriesIds;
  }

  _getRandomPrice() {
    return getRandomInt(RandomPrice.MIN, RandomPrice.MAX);
  }
};

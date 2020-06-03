'use strict';

const User = require(`./entities/user`);
const Offer = require(`./entities/offer`);
const OffersComment = require(`./entities/offers-comment`);
const Category = require(`./entities/category`);
const OffersCategory = require(`./entities/offers-category`);

const RandomPrice = {
  MIN: 100,
  MAX: 10000
};

const OfferType = {
  BUY: `buy`,
  SELL: `sell`
};

const {
  getRandomElement,
  getRandomInt,
  shuffleArray,
  readContent,
} = require(`../../../utils`);

const {
  FilePath,
  SENTENCES_MAX_VALUE
} = require(`../../../constants`);

const CommentsCount = {
  MIN: 2,
  MAX: 5
};

class Creator {
  constructor(offersCount, categories, comments, offersTitles, descriptions) {
    this._offersCount = offersCount;
    this._categories = categories;
    this._categoriesCount = this._categories.length;
    this._commentText = comments;
    this._offersTitles = offersTitles;
    this._descriptions = descriptions;

    this._usersCount = Math.floor(this._offersCount / 2);
    this._commentCounter = 1;
  }

  fillEntitiesDTO(builder) {
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

    this._categories.forEach((categoryName, index) => {
      const categoryId = index + 1;
      builder.addCategory(Category.create(categoryId, categoryName));
    });

    for (let offerId = 1; offerId <= this._offersCount; offerId++) {
      const offersUserId = this._getRandomUserId();
      const commentAuthorId = this._getRandomUserExclude(offersUserId);

      builder.addOffer(Offer.create(
          offerId,
          offersUserId,
          this._getRandomOfferType(),
          this._getRandomPrice(),
          this._getRandomOfferTitle(),
          this._getRandomDescription()
      ));

      for (let i = 0; i < getRandomInt(CommentsCount.MIN, CommentsCount.MAX); i++) {
        builder.addOffersComment(OffersComment.create(
            this._commentCounter,
            this._getRandomCommentText(),
            offerId,
            commentAuthorId
        ));

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

    return userId === randomUserId ? this._getRandomUserExclude(userId) : randomUserId;
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

  _getRandomCommentText() {
    return getRandomElement(this._commentText);
  }

  _getRandomOfferTitle() {
    return getRandomElement(this._offersTitles);
  }

  _getRandomDescription() {
    return shuffleArray(this._descriptions).slice(1, SENTENCES_MAX_VALUE).join(` `);
  }

  _getRandomOfferType() {
    return OfferType[getRandomElement(Object.keys(OfferType))];
  }
}

module.exports = {
  async getCreator(offersCount) {

    const titles = (await readContent(FilePath.TITLES)).filter((category) => category.length > 0);
    const descriptions = (await readContent(FilePath.SENTENCES)).filter((description) => description.length > 0);
    const categoriesName = (await readContent(FilePath.CATEGORIES)).filter((category) => category.length > 0);
    const commentsText = (await readContent(FilePath.COMMENTS_TEXT)).filter((commentText) => commentText.length > 0);

    return new Creator(offersCount, categoriesName, commentsText, titles, descriptions);
  }
};

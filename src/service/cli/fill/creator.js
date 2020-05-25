'use strict';

const {
  getRandomInt
} = require(`../../../utils`);

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
      builder.addUser(this._createUser(userId));
    }

    for (let categoryId = 1; categoryId <= this._categoriesCount; categoryId++) {
      builder.addCategory(this._createCategory(categoryId));
    }

    for (let offerId = 1; offerId <= this._offersCount; offerId++) {
      const offersUserId = this._getRandomUserId();
      const commentAuthorId = this._getRandomUserExclude(offersUserId);

      builder.addOffer(this._createOffer(offerId, offersUserId));
      builder.addOffersComment(this._createOffersComments((2 * offerId) - 1), offerId, commentAuthorId);
      builder.addOffersComment(this._createOffersComments(2 * offerId), offerId, commentAuthorId);

      this._getRandomCategoriesIds().forEach((categoryId) => {
        builder.addOffersCategory(this._createOffersCategory(offerId, categoryId));
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

  _createUser(userId) {
    return [
      `pseudo_encrypt(${userId})`,
      `testPassword${userId}`,
      `testName${userId}`,
      `testSurname${userId}`,
      `testAvatar${userId}`
    ];
  }

  _createCategory(categoryId) {
    return [
      `pseudo_encrypt(${categoryId})`, // category id
      `name${categoryId}` // name
    ];
  }

  _createOffer(offerId, userId) {
    return [
      `pseudo_encrypt(${offerId})`,
      `testPassword${offerId}`,
      `testName${offerId}`,
      `testSurname${offerId}`,
      `testAvatar${offerId}`,
      `pseudo_encrypt(${userId})`
    ];
  }

  _createOffersComments(commentId, offerId, userId) {
    return [
      `pseudo_encrypt(${commentId})`, // comment id
      `testText${commentId}`,
      `pseudo_encrypt(${offerId})`, // offer_id
      `pseudo_encrypt(${userId})`, // author id
    ];
  }

  _createOffersCategory(offerId, categoryId) {
    return [
      `pseudo_encrypt(${offerId})`, // offer id
      `pseudo_encrypt(${categoryId})` // category id
    ];
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

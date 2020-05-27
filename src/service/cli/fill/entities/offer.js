'use strict';

module.exports = class Offer {
  static tableName() {
    return `offers`;
  }

  static fields() {
    return [`offer_id`, `title`, `price`, `type`, `description`, `picture`, `author_id`];
  }

  static create(offerId, userId, price) {
    return [
      `pseudo_encrypt(${offerId})`,
      `'testTitle${offerId}'`,
      `${price}`,
      1,
      `'testDescription${offerId}'`,
      `'testPicture${offerId}'`,
      `pseudo_encrypt(${userId})`
    ];
  }
};

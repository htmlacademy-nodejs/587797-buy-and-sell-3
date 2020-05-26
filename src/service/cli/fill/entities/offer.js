'use strict';

module.exports = class Offer {
  static tableName() {
    return `offer`;
  }

  static fields() {
    return [`offer_id`, `title`, `price`, `type`, `description`, `picture`, `author_id`];
  }

  static create(offerId, userId) {
    return [
      `pseudo_encrypt(${offerId})`,
      `testTitle${offerId}`,
      `testPrice${offerId}`,
      1,
      `testDescription${offerId}`,
      `testPicture${offerId}`,
      `pseudo_encrypt(${userId})`
    ];
  }
};

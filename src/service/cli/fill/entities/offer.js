'use strict';

module.exports = class Offer {
  static tableName() {
    return `offers`;
  }

  static fields() {
    return [`offer_id`, `title`, `price`, `type`, `description`, `picture`, `author_id`];
  }

  static create(offerId, userId, offerType, price, title, description) {
    return [
      `pseudo_encrypt(${offerId})`,
      `'${title}'`,
      `${price}`,
      `'${offerType}'`,
      `'${description}'`,
      `'testPicture${offerId}'`,
      `pseudo_encrypt(${userId})`
    ];
  }
};

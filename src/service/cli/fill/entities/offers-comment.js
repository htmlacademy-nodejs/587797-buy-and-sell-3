'use strict';

module.exports = class OffersComment {
  static tableName() {
    return `offers_comments`;
  }

  static fields() {
    return [`comment_id`, `text`, `offer_id`, `author_id`];
  }

  static create(commentId, offerId, userId) {
    return [
      `pseudo_encrypt(${commentId})`,
      `'testText${commentId}'`,
      `pseudo_encrypt(${offerId})`,
      `pseudo_encrypt(${userId})`
    ];
  }
};

'use strict';

module.exports = class OffersComment {
  static tableName() {
    return `offers_comments`;
  }

  static fields() {
    return [`comment_id`, `text`, `offer_id`, `author_id`];
  }

  static create(commentId, text, offerId, userId) {
    return [
      `pseudo_encrypt(${commentId})`,
      `'${text}'`,
      `pseudo_encrypt(${offerId})`,
      `pseudo_encrypt(${userId})`
    ];
  }
};

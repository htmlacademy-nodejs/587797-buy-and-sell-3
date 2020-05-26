'use strict';

module.exports = class OffersCategory {
  static tableName() {
    return `offers_categories`;
  }

  static fields() {
    return [`offer_id`, `category_id`];
  }

  static create(offerId, categoryId) {
    return [
      `pseudo_encrypt(${offerId})`,
      `pseudo_encrypt(${categoryId})`
    ];
  }
};

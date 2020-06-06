'use strict';

module.exports = (sequelize, DataTypes) => {
  class OffersCategory extends sequelize.Sequelize.Model {}
  OffersCategory.init({ // @todo тут надо как-то сделать композитный ПК
    'offer_id': {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: `offers`,
        key: `offer_id`
      },
    },
    'category_id': {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: `categories`,
        key: `category_id`
      }
    },
    'created_at': DataTypes.DATE
  }, {
    sequelize,
    timestamp: true,
    createdAt: `created_at`,
    updatedAt: false,
    modelName: `offers_categories`
  });

  return OffersCategory;
};

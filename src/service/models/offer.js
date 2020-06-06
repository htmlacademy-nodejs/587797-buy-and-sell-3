'use strict';

const OFFER_TYPES = [`buy`, `sell`];

/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  class Offer extends sequelize.Sequelize.Model {}
  Offer.init({
    offer_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(256),
      unique: false, // test it
      allowNull: false
    },
    price: { // проверка больше нуля
      type: DataTypes.BIGINT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(OFFER_TYPES),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    author_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: `users`,
        key: `user_id`
      },
      onDelete: `CASCADE`
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    timestamp: true,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    modelName: `offers`
  });

  return Offer;
};
/* eslint-enable */

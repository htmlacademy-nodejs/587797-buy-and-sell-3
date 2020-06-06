'use strict';

/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  class Category extends sequelize.Sequelize.Model {}
  Category.init({
    category_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    timestamp: true,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    modelName: `categories`
  });

  return Category;
};
/* eslint-enable */

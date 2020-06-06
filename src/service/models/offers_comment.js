'use strict';

/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  class OffersComment extends sequelize.Sequelize.Model {}
  OffersComment.init({
    comment_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    offer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: `offers`,
        key: `offer_id`
      },
      onDelete: `CASCADE`
    },
    author_id: {
      type: DataTypes.BIGINT,
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
    modelName: `offers_comment`
  });

  return OffersComment;
};
/* eslint-enable */

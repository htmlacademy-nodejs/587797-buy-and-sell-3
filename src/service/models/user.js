'use strict';

/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  User.init({
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    avatar: {
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
    modelName: `users`
  });

  return User;
};
/* eslint-enable */

'use strict';

module.exports = class User {
  static tableName() {
    return `users`;
  }

  static fields() {
    return [`user_id`, `email`, `password`, `name`, `avatar`];
  }

  static create(userId) {
    return [
      `pseudo_encrypt(${userId})`,
      `testPassword${userId}`,
      `testName${userId}`,
      `testSurname${userId}`,
      `testAvatar${userId}`
    ];
  }
};

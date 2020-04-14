'use strict';

const {
  FilePath,
} = require(`../../constants`);

const {
  readContentSync
} = require(`../../utils`);

class CategoriesRepository {
  constructor() {
    this.categories = readContentSync(FilePath.CATEGORIES);
  }

  getAll() {
    if (this.categories.length === 0) {
      return {
        isSuccess: false,
        body: {
          message: `Not found any categories`
        }
      };
    } else {
      return {
        isSuccess: true,
        body: this.categories
      };
    }
  }
}

module.exports = new CategoriesRepository();

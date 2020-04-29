'use strict';

const fs = require(`fs`);
const {
  MockFile,
} = require(`../../constants`);

class CategoriesRepository {
  constructor() {
    this.categories = JSON.parse(fs.readFileSync(MockFile.CATEGORIES));
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

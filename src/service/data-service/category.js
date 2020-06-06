'use strict';

const db = require(`../db`);

class CategoryService {
  async findAll() {
    const {categories} = (await db.getConnection()).models;

    return await categories.findAll({
      attributes: [`category_id`, `name`],
      raw: true
    });
  }
}

module.exports = CategoryService;

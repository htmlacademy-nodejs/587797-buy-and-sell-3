'use strict';

const fs = require(`fs`).promises;

const {
  FilePath,
  MOCK_FILE_PATH,
} = require(`../constants`);

const {readContent} = require(`../utils`);

class OffersRepository {
  constructor() {
    this.offers = [];
    this.extractOffers = this.extractOffers.bind(this);
  }

  getOffers() {
    console.log(this.offers.length);
    return this.offers;
  }

  async extractOffers() {
    const fileContent = await fs.readFile(MOCK_FILE_PATH);

    this.offers = JSON.parse(fileContent);
  }

  delete(offerId) {
    const foundOffer = this.offers.find((offer) => offer.id === offerId);

    if (foundOffer === undefined) {
      return false;
    } else {
      this.offers = this.offers.filter((offer) => offer.id !== offerId); // есть другой способ удалить объект из массива? Без filter и без splice
      console.log(this.offers.length);

      return true;
    }
  }
}

const getOffersStorage = async () => {
  const offersStorage = new OffersRepository();
  await offersStorage.extractOffers();

  return offersStorage;
};

// let offers = extractOffers();

const getCategories = async () => {
  const categories = await readContent(FilePath.CATEGORIES);

  return JSON.stringify(categories);
};

module.exports = {
  getOffersStorage,
  getCategories
};

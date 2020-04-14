'use strict';

const fs = require(`fs`);
const {nanoid} = require(`nanoid`);

const {
  MOCK_FILE_PATH,
} = require(`../../constants`);

class OffersRepository {
  constructor() {
    this.offers = JSON.parse(fs.readFileSync(MOCK_FILE_PATH));
    this.requiredFields = [`title`, `description`, `category`, `price`, `type`, `avatar`];
  }

  getById(offerId) {
    const foundOffersData = this.offers.find((mock) => mock.id === offerId);

    if (foundOffersData === undefined) {
      return {
        isSuccess: false,
        body: {
          message: `There is no such offer with id #${offerId}`
        }
      };
    } else {
      return {
        isSuccess: true,
        body: foundOffersData
      };
    }
  }

  getAll() {
    if (this.offers.length === 0) {
      return {
        isSuccess: false,
        body: {
          message: `Not found any offers`
        }
      };
    } else {
      return {
        isSuccess: true,
        body: this.offers
      };
    }
  }

  delete(offerId) {
    const response = this.getById(offerId);

    if (!response.isSuccess) {
      return response;
    } else {
      this.offers = this.offers.filter((offer) => offer.id !== offerId);

      return {
        isSuccess: true
      };
    }
  }

  create(data) {
    const fieldsKeys = Object.keys(data);

    if (!this._isValidPostData(data)) {
      return {
        isSuccess: false,
        body: {
          message: `Invalid form: ${fieldsKeys}`
        }
      };
    }

    const newOffer = Object.assign({}, data, {id: nanoid()});

    this.offers.push(newOffer);

    return {
      isSuccess: true,
      body: newOffer
    };
  }

  put(offerId, data) {
    const fieldsKeys = Object.keys(data);

    if (!this._isValidPutData()) {
      return {
        isSuccess: false,
        body: {
          message: `Invalid form: ${fieldsKeys}`
        }
      };
    }

    const getResponse = this.getById(offerId);

    if (!getResponse.isSuccess) {
      return getResponse;
    }

    const deleteResponse = this.delete(offerId);

    if (!deleteResponse.isSuccess) {
      return deleteResponse;
    }

    const newOffer = Object.assign({}, getResponse.body, data);
    this.offers.push(newOffer);

    return {
      isSuccess: true,
      body: newOffer
    };
  }

  _isValidPostData(data) {
    const fieldsKeys = Object.keys(data);

    return this.requiredFields.every((requiredField) => fieldsKeys.includes(requiredField));
  }

  _isValidPutData(data) {
    const fieldsKeys = Object.keys(data);

    return fieldsKeys.every((requiredField) => this.requiredFields.includes(requiredField));
  }
}

module.exports = new OffersRepository();

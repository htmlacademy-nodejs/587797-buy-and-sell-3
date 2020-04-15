'use strict';

const fs = require(`fs`);
const {nanoid} = require(`nanoid`);

const {
  MOCK_FILE_PATH,
} = require(`../../constants`);

class OffersRepository {
  constructor() {
    this.offers = JSON.parse(fs.readFileSync(MOCK_FILE_PATH));
    this.offerRequiredFields = [`title`, `description`, `category`, `price`, `type`, `avatar`];
    this.commentRequiredFields = [`comment`];
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
        isSuccess: true,
        body: null
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

  getComments(offerId) {
    const response = this.getById(offerId);

    if (!response.isSuccess) {
      return response;
    }

    return {
      isSuccess: true,
      body: response.body.comments
    };
  }

  deleteComment(offerId, commentId) {
    const response = this.getById(offerId);

    if (!response.isSuccess) {
      return response;
    }

    const offer = response.body;
    const comments = offer.comments;

    if (comments.length === 0) {
      return {
        isSuccess: false,
        body: {
          message: `There is no comments yet`
        }
      };
    }

    const foundComment = comments.find((comment) => comment.id === commentId);

    if (foundComment === undefined) {
      return {
        isSuccess: false,
        body: {
          message: `There is no comment with id #${commentId}`
        }
      };
    }

    const newComments = comments.filter((comment) => comment.id !== commentId);
    const newOffer = Object.assign({}, offer, {comments: newComments});
    const deleteResponse = this.delete(offerId);

    if (!deleteResponse.isSuccess) {
      return deleteResponse;
    }

    this.offers.push(newOffer);

    return {
      isSuccess: true,
      body: null
    };
  }

  createComment(offerId, data) {
    const fieldsKeys = Object.keys(data);

    if (!this._isValidCommentPostData(data)) {
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

    const offer = getResponse.body;
    const newComment = Object.assign({}, data, {id: nanoid()});

    offer.comments.push(newComment);

    return {
      isSuccess: true,
      body: newComment
    };
  }

  search(query) {
    const offers = this.offers;

    const foundOffers = offers.filter((offer) => offer.title.indexOf(query) !== -1);

    return {
      isSuccess: true,
      body: foundOffers
    };
  }

  _isValidPostData(data) {
    const fieldsKeys = Object.keys(data);

    return this.offerRequiredFields.every((requiredField) => fieldsKeys.includes(requiredField));
  }

  _isValidPutData(data) {
    const fieldsKeys = Object.keys(data);

    return fieldsKeys.every((requiredField) => this.offerRequiredFields.includes(requiredField));
  }

  _isValidCommentPostData(data) {
    const fieldsKeys = Object.keys(data);

    return this.commentRequiredFields.every((requiredField) => fieldsKeys.includes(requiredField));
  }
}

module.exports = new OffersRepository();

'use strict';

const {Router} = require(`express`);
const OffersRepository = require(`../repositories/offersRepository`);

const {
  HttpCode,
} = require(`../../constants`);

const offersRouter = new Router();

offersRouter
  .get(`/:offerId`, (req, res) => {
    const offerId = req.params.offerId;
    const response = OffersRepository.getById(offerId);

    if (response.isSuccess) {
      res.json(response.body);
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
    }
  })
  .put(`/:offerId`, (req, res) => {
    const offerId = req.params.offerId;
    const response = OffersRepository.put(offerId, req.body);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_POST).send(response.body);
    } else {
      res.status(HttpCode.WRONG_QUERY).send(response.body.message);
    }
  })
  .delete(`/:offerId`, (req, res) => {
    const offerId = req.params.offerId;
    const response = OffersRepository.delete(offerId);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_DELETE).send();
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
    }

  });

offersRouter
  .get(`/:offerId/comments`, async (req, res) => {
    const offerId = req.params.offerId;

    const response = OffersRepository.getComments(offerId);

    if (response.isSuccess) {
      res.json(response.body);
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
    }
  })
  .post(`/:offerId/comments`, async (req, res) => {
    const offerId = req.params.offerId;

    const response = OffersRepository.createComment(offerId, req.body);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_POST).send(response.body);
    } else {
      res.status(HttpCode.WRONG_QUERY).send(response.body.message);
    }
  })
  .delete(`/:offerId/comments/:commentId`, async (req, res) => {
    const {offerId, commentId} = req.params;

    const response = OffersRepository.deleteComment(offerId, commentId);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_DELETE).send();
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
    }
  });

offersRouter
  .get(`/`, (req, res) => {
    const response = OffersRepository.getAll();

    if (response.isSuccess) {
      res.json(response.body);
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
    }
  })
  .post(`/`, async (req, res) => {
    const response = OffersRepository.create(req.body);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_POST).send(response.body);
    } else {
      res.status(HttpCode.WRONG_QUERY).send(response.body.message);
    }
  });

module.exports = offersRouter;

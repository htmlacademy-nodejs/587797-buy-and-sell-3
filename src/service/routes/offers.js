'use strict';

const {getLogger} = require(`../logger`);
const logger = getLogger();

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
      logger.info(`End request with status code ${HttpCode.OK}`);
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
      logger.error(`End request with error: ${HttpCode.NOT_FOUND}`);
    }
  })
  .put(`/:offerId`, (req, res) => {
    const offerId = req.params.offerId;
    const response = OffersRepository.put(offerId, req.body);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_POST).send(response.body);
      logger.info(`End request with status code ${HttpCode.SUCCESS_POST}`);
    } else {
      res.status(HttpCode.WRONG_QUERY).send(response.body.message);
      logger.error(`End request with error: ${HttpCode.WRONG_QUERY}`);
    }
  })
  .delete(`/:offerId`, (req, res) => {
    const offerId = req.params.offerId;
    const response = OffersRepository.delete(offerId);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_DELETE).send();
      logger.info(`End request with status code ${HttpCode.SUCCESS_DELETE}`);
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
      logger.error(`End request with error: ${HttpCode.NOT_FOUND}`);
    }

  });

offersRouter
  .get(`/:offerId/comments`, async (req, res) => {
    const offerId = req.params.offerId;

    const response = OffersRepository.getComments(offerId);

    if (response.isSuccess) {
      res.json(response.body);
      logger.info(`End request with status code ${HttpCode.OK}`);
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
      logger.error(`End request with error: ${HttpCode.NOT_FOUND}`);
    }
  })
  .post(`/:offerId/comments`, async (req, res) => {
    const offerId = req.params.offerId;

    const response = OffersRepository.createComment(offerId, req.body);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_POST).send(response.body);
      logger.info(`End request with status code ${HttpCode.SUCCESS_POST}`);
    } else {
      res.status(HttpCode.WRONG_QUERY).send(response.body.message);
      logger.error(`End request with error: ${HttpCode.WRONG_QUERY}`);
    }
  })
  .delete(`/:offerId/comments/:commentId`, async (req, res) => {
    const {offerId, commentId} = req.params;

    const response = OffersRepository.deleteComment(offerId, commentId);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_DELETE).send();
      logger.info(`End request with status code ${HttpCode.SUCCESS_DELETE}`);
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
      logger.error(`End request with error: ${HttpCode.NOT_FOUND}`);
    }
  });

offersRouter
  .get(`/`, (req, res) => {
    const response = OffersRepository.getAll();

    if (response.isSuccess) {
      res.json(response.body);
      logger.info(`End request with status code ${HttpCode.OK}`);
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
      logger.error(`End request with error: ${HttpCode.NOT_FOUND}`);
    }
  })
  .post(`/`, async (req, res) => {
    const response = OffersRepository.create(req.body);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_POST).send(response.body);
      logger.info(`End request with status code ${HttpCode.SUCCESS_POST}`);
    } else {
      res.status(HttpCode.WRONG_QUERY).send(response.body.message);
      logger.error(`End request with error: ${HttpCode.WRONG_QUERY}`);
    }
  });

module.exports = offersRouter;

'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {Router} = require(`express`);
const OffersRepository = require(`../repositories/offersRepository`);

const {
  MOCK_FILE_PATH,
  HttpCode,
  ErrorCode
} = require(`../../constants`);

const offersRouter = new Router();

const TICKET_REQUIRED_FIELDS = [`title`, `description`, `category`, `price`, `action`];
const COMMENTS_REQUIRED_FIELDS = [`comment`];

offersRouter
  .get(`/:id`, (req, res) => {
    const offerId = req.params.id;
    const response = OffersRepository.getById(offerId);

    if (response.isSuccess) {
      res.json(response.body);
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
    }
  })
  .put(`/:id`, (req, res) => {
    const offerId = req.params.id;
    const response = OffersRepository.put(offerId, req.body);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_POST).send(response.body);
    } else {
      res.status(HttpCode.WRONG_QUERY).send(response.body.message);
    }
  })
  .delete(`/:id`, (req, res) => {
    const offerId = req.params.id;
    const response = OffersRepository.delete(offerId);

    if (response.isSuccess) {
      res.status(HttpCode.SUCCESS_DELETE).send();
    } else {
      res.status(HttpCode.NOT_FOUND).send(response.body.message);
    }

  });

offersRouter
  .get(`/:id/comments`, async (req, res) => {
    try {
      const ticketId = req.params.id;
      const fileContent = await fs.readFile(MOCK_FILE_PATH);
      const mocks = JSON.parse(fileContent);
      const ticketData = mocks.filter((mock) => mock.id === ticketId);

      if (ticketData.length === 0) {
        res.status(HttpCode.NOT_FOUND).send(`No such ticket with id #${ticketId}`);
      } else {
        res.json(ticketData[0].comments);
      }
    } catch (error) {
      if (error.code === ErrorCode.NO_FILE_OR_DIRECTORY) {
        res.status(HttpCode.NOT_FOUND).send(`There is no data file`);
      } else {
        res.status(HttpCode.INTERNAL_ERROR).send(`Internal error`);
      }

      console.info(chalk.red(error));
    }
  })
  .post(`/:offerId/comments`, async (req, res) => {
    const fieldsKeys = Object.keys(req.body);

    if (COMMENTS_REQUIRED_FIELDS.every((requiredField) => fieldsKeys.includes(requiredField))) {
      res.status(HttpCode.SUCCESS_POST).send(Object.keys(req.body));
    } else {
      res.status(HttpCode.WRONG_QUERY).send(`Invalid form: ${Object.keys(req.body)}`);
    }
  })
  .delete(`/:offerId/comments/:commentId`, async (req, res) => {
    // const {offerId, commentId} = req.params;

    if (Math.round(Math.random())) {
      res.status(HttpCode.SUCCESS_DELETE).send();
    } else {
      res.status(HttpCode.NOT_FOUND).send(`Something wrong`);
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

'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {Router} = require(`express`);

const {
  MOCK_FILE_PATH,
  HttpCode,
  ErrorCode
} = require(`../../constants`);

const offersRouter = new Router();

const TICKET_REQUIRED_FIELDS = [`title`, `comment`, `category`, `price`, `action`];
const COMMENTS_REQUIRED_FIELDS = [`comment`];

offersRouter
  .get(`/:id`, async (req, res) => {
    try {
      const fileContent = await fs.readFile(MOCK_FILE_PATH);
      const mocks = JSON.parse(fileContent);
      res.json(mocks.filter((mock) => mock.id === req.params.id)[0]);
    } catch (error) {
      if (error.code === ErrorCode.NO_FILE_OR_DIRECTORY) {
        res.status(HttpCode.NOT_FOUND).send(`There is no data file`);
      } else {
        res.status(HttpCode.INTERNAL_ERROR).send(`Internal error`);
      }

      console.info(chalk.red(error));
    }
  })
  .put(`/:id`, async (req, res) => {
    const fieldsKeys = Object.keys(req.body);

    if (TICKET_REQUIRED_FIELDS.every((requiredField) => fieldsKeys.includes(requiredField))) {
      res.status(HttpCode.SUCCESS_POST).send(Object.keys(req.body));
    } else {
      res.status(HttpCode.WRONG_QUERY).send(`Invalid form: ${Object.keys(req.body)}`);
    }
  })
  .delete(`/:id`, async (req, res) => {
    if (Math.round(Math.random())) {
      res.status(HttpCode.SUCCESS_DELETE).send();
    } else {
      res.status(HttpCode.NOT_FOUND).send(`Something wrong`);
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
  .get(`/`, async (req, res) => {
    try {
      const fileContent = await fs.readFile(MOCK_FILE_PATH);
      const mocks = JSON.parse(fileContent);
      res.json(mocks);
    } catch (error) {
      if (error.code === ErrorCode.NO_FILE_OR_DIRECTORY) {
        res.status(HttpCode.NOT_FOUND).send(`There is no data file`);
      } else {
        res.status(HttpCode.INTERNAL_ERROR).send(`Internal error`);
      }

      console.info(chalk.red(error));
    }
  })
  .post(`/`, async (req, res) => {
    const fieldsKeys = Object.keys(req.body);

    if (TICKET_REQUIRED_FIELDS.every((requiredField) => fieldsKeys.includes(requiredField))) {
      res.status(HttpCode.SUCCESS_POST).send(Object.keys(req.body));
    } else {
      res.status(HttpCode.WRONG_QUERY).send(`Invalid form: ${Object.keys(req.body)}`);
    }
  });

module.exports = offersRouter;

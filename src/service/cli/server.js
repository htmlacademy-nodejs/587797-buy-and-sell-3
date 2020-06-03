'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {getLogger, httpLoggerMiddleware} = require(`../logger`);
const logger = getLogger();
const db = require(`../db`);

const DEFAULT_PORT = 3000;
const {
  ExitCode,
  HttpCode
} = require(`../../constants`);

const prepareApplication = () => {
  const offersRouter = require(`../routes/offers`);
  const categoriesRouter = require(`../routes/categories`);
  const searchRouter = require(`../routes/search`);

  const app = express();

  app.use(httpLoggerMiddleware);

  app.use((req, res, next) => {
    logger.debug(`Start request to url: ${req.url}`);

    const onRequestFinish = () => {
      logger.info(`Response status: ${res.statusCode}`);
      res.off(`finish`, onRequestFinish);
    };

    res.on(`finish`, onRequestFinish);
    next();
  });

  app.use(express.json());
  app.use(`/api/offers`, offersRouter);
  app.use(`/api/categories`, categoriesRouter);
  app.use(`/api/search`, searchRouter);

  app.use((req, res) => {
    res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`);

    logger.error(`End request with error: ${res.statusCode}`);
  });

  app.use((error, req, res, next) => {
    res
      .status(HttpCode.INTERNAL_ERROR)
      .send(`Internal server error`);

    logger.error(`Internal error: ${error}`);
  });

  return app;
};

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    const isSuccessDbConnect = await db.connect();

    if (!isSuccessDbConnect) {
      logger.error(`Db problem. Stop launching application...`);

      process.exit(ExitCode.FAIL);
    }
    const app = prepareApplication();

    app
      .listen(port, () => {
        logger.info(chalk.green(`Server starts on port: ${port}`));
      })
      .on(`error`, (error) => {
        logger.error(chalk.green(`Server can't start. Error: ${error}`));
      });
  }
};

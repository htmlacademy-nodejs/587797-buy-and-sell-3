'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {getLogger} = require(`../logger`);
const logger = getLogger();

const offersRouter = require(`../routes/offers`);
const categoriesRouter = require(`../routes/categories`);
const searchRouter = require(`../routes/search`);

const DEFAULT_PORT = 3000;
const {
  HttpCode,
} = require(`../../constants`);

const app = express();

app.use(express.json());
app.use(`/api/offers`, offersRouter);
app.use(`/api/categories`, categoriesRouter);
app.use(`/api/search`, searchRouter);

app.use((req, res, next) => {
  logger.debug(`Start request to url: ${req.url}`);
  next();
});

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .send(`Not found`);

  logger.error(`End request with error: ${res.statusCode}`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    app
      .listen(port, () => {
        logger.info(chalk.green(`Server starts on port: ${port}`));
      })
      .on(`error`, (error) => {
        logger.error(chalk.green(`Server can't start. Error: ${error}`));
      });
  }
};

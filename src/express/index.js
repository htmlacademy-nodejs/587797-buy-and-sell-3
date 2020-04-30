'use strict';

const path = require(`path`);
const express = require(`express`);
const {getLogger} = require(`./logger`);
const logger = getLogger();

const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);

const PORT = 8080;
const {HttpCode} = require(`../constants`);
const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;

const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);

app.use((req, res, next) => {
  logger.error(`404 error`);

  res
    .status(HttpCode.NOT_FOUND)
    .render(`errors/400`, {
      errorClass: `html-not-found`
    });
});

app.use((err, req, res, next) => {
  res
    .status(HttpCode.INTERNAL_ERROR)
    .render(`errors/500`, {
      errorClass: `html-server`
    });

  logger.error(`Internal error: ${err}`);
});

app.listen(PORT, (error) => {
  if (error) {
    logger.error(`Ошибка при создании сервера`, error);
  }

  logger.info(`Ожидаю соединений на порт ${PORT}`);
});

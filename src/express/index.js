'use strict';

const path = require(`path`);
const express = require(`express`);

const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);

const PORT = 8080;
const {HttpCode} = require(`../constants`);
const PUBLIC_DIR = `public`;

const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);

app.listen(PORT);

app.use((req, res, next) => {
  res
    .status(HttpCode.NOT_FOUND)
    .render(`errors/400`, {
      errorClass: `html-not-found`
    });

  next();
});

app.use((err, req, res, next) => {
  res
    .status(HttpCode.INTERNAL_ERROR)
    .render(`errors/500`, {
      errorClass: `html-server`
    });

  next();
});

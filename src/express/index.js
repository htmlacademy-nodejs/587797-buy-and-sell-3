'use strict';

const express = require(`express`);

const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);

const PORT = 8080;
const HttpStatusCodes = {
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const app = express();

app.use(express.static(`markup`));

app.set(`views`, __dirname + `/templates`);
app.set(`view engine`, `pug`);

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);

app.listen(PORT);

app.use((req, res, next) => {
  res
    .status(HttpStatusCodes.NOT_FOUND)
    .render(`errors/400`, {
      errorClass: `html-not-found`
    });

  next();
});

app.use((err, req, res, next) => {
  res
    .status(HttpStatusCodes.SERVER_ERROR)
    .render(`errors/500`, {
      errorClass: `html-server`
    });

  next();
});

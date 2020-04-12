'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

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

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    app.listen(port, (error) => {
      if (error) {
        console.info(chalk.green(`Ошибка при создании сервера`, error));
      }

      console.info(chalk.green(`Ожидаю соединений на порт ${port}`));
    });
  }
};

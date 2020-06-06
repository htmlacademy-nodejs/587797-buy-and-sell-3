'use strict';

require(`dotenv`).config();
const path = require(`path`);
const {Sequelize} = require(`sequelize`);
const {getLogger} = require(`./logger`);
const logger = getLogger();

module.exports = {
  async connect() {
    const {
      DB_NAME,
      DB_USERNAME,
      DB_PASSWORD,
      DB_HOST,
      DB_PORT,
      DB_DIALECT
    } = process.env;

    const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: DB_DIALECT
    });

    try {
      logger.info(`Start connecting to database...`);
      await sequelize.authenticate();
      logger.info(`Successfully connected to database`);

      const User = sequelize.import(path.join(__dirname, `./models/user`));
      const Offer = sequelize.import(path.join(__dirname, `./models/offer`));
      const Category = sequelize.import(path.join(__dirname, `./models/category`));
      const OffersComment = sequelize.import(path.join(__dirname, `./models/offers_comment`));
      const OffersCategory = sequelize.import(path.join(__dirname, `./models/offers_category`));

      sequelize.sync().catch((err) => logger.error(err));

      return true;
    } catch (error) {
      logger.error(`Can't connect to database: ${error}`);

      return false;
    }
  }
};

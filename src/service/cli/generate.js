'use strict';

const chalk = require(`chalk`);
const moment = require(`moment`);
const {nanoid} = require(`nanoid`);
const {
  getRandomInt,
  shuffleArray,
  readContent,
} = require(`../../utils`);

const {
  DEFAULT_OFFER_NUMBER,
  MockFile,
  MAX_MOCK_OBJECT_NUMBER,
  ExitCode,
  FilePath
} = require(`../../constants`);

const fs = require(`fs`).promises;

const SENTENCES_MAX_VALUE = 5;

const SumRestrict = {
  MAX: 100000,
  MIN: 1000
};

const OfferType = {
  BUY: `buy`,
  SELL: `sell`
};

const PictureValue = {
  MIN: 1,
  MAX: 16
};

const generateComments = (count, commentsText) => {
  return Array(count).fill({}).map(() => {
    return {
      id: nanoid(),
      text: shuffleArray(commentsText).slice(1, count).join(` `)
    };
  });
};

const generatePicture = () => {
  let pictureNumber = getRandomInt(PictureValue.MIN, PictureValue.MAX);

  if (pictureNumber < 10) {
    pictureNumber = `0${pictureNumber}`;
  }
  return `${pictureNumber}`;
};

const generateDate = () => {
  return moment().locale(`ru`).format(`DD MMMM YYYY`);
};

const generateCategories = (categories) => {
  return categories.map((category) => ({
    id: nanoid(),
    name: category
  }));
};

const generateOffers = (offersNumber, titles, categories, sentences, commentsText) => {
  const offerTypes = Object.keys(OfferType);

  return Array(offersNumber).fill({}).map(() => ({
    id: nanoid(),
    type: OfferType[offerTypes[getRandomInt(0, offerTypes.length - 1)]],
    title: titles[getRandomInt(0, titles.length - 1)],
    description: shuffleArray(sentences).slice(1, SENTENCES_MAX_VALUE).join(` `),
    price: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    picture: generatePicture(),
    categories: shuffleArray(categories).slice(0, getRandomInt(1, 3)),
    createdAt: generateDate(),
    comments: generateComments(getRandomInt(1, 5), commentsText),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [offersNumberFromUser] = args;
    const offersNumber = Number(offersNumberFromUser) || DEFAULT_OFFER_NUMBER;

    if (offersNumber > MAX_MOCK_OBJECT_NUMBER) {
      console.info(chalk.green(`No more than ${MAX_MOCK_OBJECT_NUMBER} advertisements`));
      process.exit(ExitCode.SUCCESS);
    }

    console.log(args);

    const titles = await readContent(FilePath.TITLES);
    const categoriesFromFile = await readContent(FilePath.CATEGORIES);
    const sentences = await readContent(FilePath.SENTENCES);
    const commentsText = await readContent(FilePath.COMMENTS_TEXT);

    const categories = generateCategories(categoriesFromFile);

    try {
      await fs.writeFile(MockFile.CATEGORIES, JSON.stringify(categories));
      await fs.writeFile(MockFile.OFFERS, JSON.stringify(generateOffers(offersNumber, titles, categories, sentences, commentsText)));
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`, error));
      process.exit(ExitCode.FAIL);
    }

    console.info(chalk.green(`Operation success. File created`));
    process.exit(ExitCode.SUCCESS);
  }
};

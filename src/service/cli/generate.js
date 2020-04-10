'use strict';

const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {
  getRandomInt,
  shuffleArray
} = require(`../../utils`);

const {
  DEFAULT_OFFER_NUMBER,
  MOCK_FILE_PATH,
  MAX_MOCK_OBJECT_NUMBER,
  ExitCode
} = require(`../../constants`);

const FilePath = {
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS_TEXT: `./data/comments_text.txt`
};

const fs = require(`fs`).promises;

const SENTENCES_MAX_VALUE = 5;

const SumRestrict = {
  MAX: 100000,
  MIN: 1000
};

const OfferType = {
  offer: `offer`,
  type: `type`
};

const PictureValue = {
  MIN: 1,
  MAX: 16
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);

    return content.split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));

    return [];
  }
};

const generateComments = (count, commentsText) => {
  return Array(count).fill({}).map(() => {
    return {
      id: nanoid(),
      text: shuffleArray(commentsText).slice(1, count).join(` `)
    };
  });
};

const generateOffers = (offersNumber, titles, categories, sentences, commentsText) => {
  const offerTypes = Object.keys(OfferType);

  return Array(offersNumber).fill({}).map(() => ({
    id: nanoid(),
    type: OfferType[offerTypes[getRandomInt(0, offerTypes.length - 1)]],
    title: titles[getRandomInt(0, titles.length - 1)],
    description: shuffleArray(sentences).slice(1, SENTENCES_MAX_VALUE).join(` `),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    picture: `item${getRandomInt(PictureValue.MIN, PictureValue.MAX)}.jpg`,
    category: shuffleArray(categories).slice(1, getRandomInt(1, categories.length - 1)),
    comments: generateComments(getRandomInt(1, 5), commentsText)
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

    const titles = await readContent(FilePath.TITLES);
    const categories = await readContent(FilePath.CATEGORIES);
    const sentences = await readContent(FilePath.SENTENCES);
    const commentsText = await readContent(FilePath.COMMENTS_TEXT);

    try {
      await fs.writeFile(MOCK_FILE_PATH, JSON.stringify(generateOffers(offersNumber, titles, categories, sentences, commentsText)));
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`, error));
      process.exit(ExitCode.FAIL);
    }

    console.info(chalk.green(`Operation success. File created`));
    process.exit(ExitCode.SUCCESS);
  }
};

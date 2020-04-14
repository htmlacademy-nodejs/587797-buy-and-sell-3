'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

const readContent = async (filePath) => {
  try {
    const content = await fs.promises.readFile(filePath, `utf8`);

    return content.split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));

    return [];
  }
};

const readContentSync = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, `utf8`);

    return content.split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));

    return [];
  }
};

module.exports = {
  getRandomInt,
  shuffleArray,
  readContent,
  readContentSync
};

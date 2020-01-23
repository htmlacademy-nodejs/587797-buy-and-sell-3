'use strict';

const {
  getRandomInt,
  shuffleArray
} = require(`../../utils`);

const {
  DEFAULT_OFFER_NUMBER,
  MOCK_FILE_PATH
} = require(`../../constants`);

const fs = require(`fs`);

const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`
];

const SumRestrict = {
  MAX: 100000,
  MIN: 1000
};

const generateOffers = (offersNumber) => {
  return Array(offersNumber).fill({}).map(() => ({
    type: `offer`,
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    description: shuffleArray(SENTENCES).slice(1, 5).join(` `),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    picture: `item${getRandomInt(1, 16)}.jpg`,
    category: CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]
  }))
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [offersNumberFromUser] = args;
    const offersNumber = Number(offersNumberFromUser) || DEFAULT_OFFER_NUMBER;

    if (offersNumber > 1000) {
      console.info(`No more than 1000 advertisements`);
      process.exit(0);
    }

    fs.writeFile(MOCK_FILE_PATH, JSON.stringify(generateOffers(offersNumber)), (error) => {
      if (error) {
        console.error(`Can't write data to file...`);
        process.exit(1);
      }

      console.info(`Operation success. File created`);
      process.exit(0);
    })
  }
};

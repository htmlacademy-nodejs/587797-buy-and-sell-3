'use strict';

jest.mock(`../repositories/offersRepository`);

const OffersRepository = require(`../repositories/offersRepository`);

let request = require(`supertest`);

const searchRouter = require(`./search`);
const express = require(`express`);

const app = express();

app.use(express.json());
app.use(`/`, searchRouter);

const {
  HttpCode,
  ContentTypeRegExp
} = require(`../../constants`);

describe(`tests GET /?search= route`, () => {
  test(`test no query param => not found response`, async () => {
    const query = ``;
    const res = await request(app).get(`/`).query({query})
    .expect(`Content-Type`, ContentTypeRegExp.HTML);

    expect(OffersRepository.search.mock.calls).toEqual([]);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.text).toBe(`There is no search param`);
  });

  test(`test not found any offers`, async () => {
    const query = `someQuery`;
    const searchMethodResponse = {
      isSuccess: false,
      body: {
        message: `Wrong`
      }
    };

    OffersRepository.search.mockReturnValue(searchMethodResponse);

    const res = await request(app).get(`/`).query({query})
      .expect(`Content-Type`, ContentTypeRegExp.HTML);

    expect(OffersRepository.search.mock.calls[0][0]).toBe(query);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.text).toBe(searchMethodResponse.body.message);
  });

  test(`test success found offers`, async () => {
    const query = `someQuery`;
    const searchMethodResponse = {
      isSuccess: true,
      body: [
        {
          id: `testId1`,
          type: `testType1`,
        },
        {
          id: `testId2`,
          type: `testType2`,
        }
      ]
    };

    OffersRepository.search.mockReturnValue(searchMethodResponse);

    const res = await request(app).get(`/`).query({query})
      .expect(`Content-Type`, ContentTypeRegExp.JSON);

    expect(OffersRepository.search.mock.calls[0][0]).toBe(query);
    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toEqual(searchMethodResponse.body);
  });
});

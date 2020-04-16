'use strict';

jest.mock(`../repositories/categoriesRepository`);

const CategoriesRepository = require(`../repositories/categoriesRepository`);

let request = require(`supertest`);

const categoriesRouter = require(`./categories`);
const express = require(`express`);

const app = express();

app.use(express.json());
app.use(`/`, categoriesRouter);

const {
  HttpCode,
  ContentTypeRegExp
} = require(`../../constants`);

describe(`test GET api/categories/ route`, () => {
  test(`test success answer`, async () => {
    const getAllMethodResponse = {
      isSuccess: true,
      body: {
        data: [1, 2, 3]
      }
    };
    CategoriesRepository.getAll.mockReturnValue(getAllMethodResponse);

    const res = await request(app).get(`/`).expect(`Content-Type`, ContentTypeRegExp.JSON);

    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toStrictEqual(getAllMethodResponse.body);
  });

  test(`test 404 answer`, async () => {
    const getAllMethodResponse = {
      isSuccess: false,
      body: {
        message: `Wrong`
      }
    };
    CategoriesRepository.getAll.mockReturnValue(getAllMethodResponse);

    const res = await request(app).get(`/`).expect(`Content-Type`, ContentTypeRegExp.HTML);

    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.text).toBe(getAllMethodResponse.body.message);
  });
});

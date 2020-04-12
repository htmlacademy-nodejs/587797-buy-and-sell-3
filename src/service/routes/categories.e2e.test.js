'use strict';

const request = require(`supertest`);
const router = require(`./categories`);
const app = require(`express`)();

const {
  HttpCode
} = require(`../../constants`);

describe(`test categories route`, () => {
  test(`test categories GET method success answer`, async () => {
    const res = await request(app.use(router)).get(`/`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });
});

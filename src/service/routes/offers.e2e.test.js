'use strict';

const request = require(`supertest`);
const offersRouter = require(`./offers`);
const app = require(`express`)();
app.use(offersRouter);

const {
  HttpCode
} = require(`../../constants`);

describe(`test categories route`, () => {
  test(`test categories GET method success answer`, async () => {
    const res = await request(app).get(`/`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });
});

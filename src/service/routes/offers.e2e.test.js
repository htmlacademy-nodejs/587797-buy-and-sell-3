'use strict';

jest.mock(`../repositories/offersRepository`);
const OffersRepository = require(`../repositories/offersRepository`);

const request = require(`supertest`);
const offersRouter = require(`./offers`);
const express = require(`express`);
const app = express();

app.use(express.json());
app.use(`/`, offersRouter);

const {
  HttpCode
} = require(`../../constants`);

const ContentTypeRegExp = {
  HTML: /text\/html/,
  JSON: /application\/json/
};

describe(`tests GET /:offerId route`, () => {
  test(`test success response`, async () => {
    const getByIdMethodResponse = {
      isSuccess: true,
      body: {
        "id": `uzteRE_pDLf20LbIXZY-A`,
        "type": `type`,
      }
    };

    OffersRepository.getById.mockReturnValue(getByIdMethodResponse);

    const res = await request(app).get(`/offerId`).expect(`Content-Type`, ContentTypeRegExp.JSON);

    expect(OffersRepository.getById.mock.calls[0][0]).toBe(`offerId`);
    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toStrictEqual(getByIdMethodResponse.body);
  });

  test(`test not found offer response`, async () => {
    const getByIdMethodResponse = {
      isSuccess: false,
      body: {
        message: `Wrong`
      }
    };

    OffersRepository.getById.mockReturnValue(getByIdMethodResponse);

    const res = await request(app).get(`/offerId`).expect(`Content-Type`, ContentTypeRegExp.HTML);

    expect(OffersRepository.getById.mock.calls[0][0]).toBe(`offerId`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.text).toBe(getByIdMethodResponse.body.message);
  });
});

describe(`tests PUT /:offerId route`, () => {
  test(`test success response`, async (done) => {
    const putData = {
      id: `uzteRE_pDLf20LbIXZY-A`,
      type: `type`
    };

    const putMethodResponse = {
      isSuccess: true,
      body: {
        id: `test id`,
        type: `test type`,
      }
    };

    OffersRepository.put.mockReturnValue(putMethodResponse);

    const res = await request(app)
      .put(`/offerId`)
      .send(putData)
      .expect(`Content-Type`, ContentTypeRegExp.JSON);

    expect(OffersRepository.put.mock.calls[0][0]).toBe(`offerId`);
    expect(OffersRepository.put.mock.calls[0][1]).toStrictEqual(putData);
    expect(res.statusCode).toBe(HttpCode.SUCCESS_POST);
    expect(res.body).toStrictEqual(putMethodResponse.body);
    done();
  });

  test(`test wrong response`, async (done) => {
    const putData = {
      id: `uzteRE_pDLf20LbIXZY-A`,
      type: `type`
    };

    const putMethodResponse = {
      isSuccess: false,
      body: {
        message: `Something is wrong`
      }
    };

    OffersRepository.put.mockReturnValue(putMethodResponse);

    const res = await request(app)
      .put(`/offerId`)
      .send(putData)
      .expect(`Content-Type`, ContentTypeRegExp.HTML);

    expect(OffersRepository.put.mock.calls[0][0]).toBe(`offerId`);
    expect(OffersRepository.put.mock.calls[0][1]).toStrictEqual(putData);
    expect(res.statusCode).toBe(HttpCode.WRONG_QUERY);
    expect(res.text).toBe(putMethodResponse.body.message);
    done();
  });
});

describe(`tests DELETE /:offerId route`, () => {
  test(`test success delete`, async (done) => {
    const offerId = `offerIdTest`;
    const deleteMethodResponse = {
      isSuccess: true,
    };

    OffersRepository.delete.mockReturnValue(deleteMethodResponse);

    const res = await request(app)
      .delete(`/${offerId}`);

    expect(OffersRepository.delete.mock.calls[0][0]).toBe(offerId);
    expect(res.statusCode).toBe(HttpCode.SUCCESS_DELETE);
    expect(res.text).toBe(``);
    done();
  });

  test(`test wrong delete`, async (done) => {
    const offerId = `offerIdTest`;
    const deleteMethodResponse = {
      isSuccess: false,
      body: {
        message: `Something is wrong`
      }
    };

    OffersRepository.delete.mockReturnValue(deleteMethodResponse);

    const res = await request(app)
      .delete(`/${offerId}`);

    expect(OffersRepository.delete.mock.calls[0][0]).toBe(offerId);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.text).toBe(deleteMethodResponse.body.message);
    done();
  });
});

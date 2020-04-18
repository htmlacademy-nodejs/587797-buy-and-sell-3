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
  HttpCode,
  ContentTypeRegExp
} = require(`../../constants`);

describe(`tests GET api/offers/:offerId route`, () => {
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

describe(`tests PUT api/offers/:offerId route`, () => {
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

describe(`tests DELETE api/offers/:offerId route`, () => {
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

describe(`tests GET api/offers/:offerId/comments route`, () => {
  test(`test success response`, async () => {
    const offerId = `offerIdTest`;
    const getCommentsMethodResponse = {
      isSuccess: true,
      body: [
        {
          id: `id1`,
          type: `type1`,
        },
        {
          id: `id2`,
          type: `type2`,
        }
      ]
    };

    OffersRepository.getComments.mockReturnValue(getCommentsMethodResponse);

    const res = await request(app)
      .get(`/${offerId}/comments`)
      .expect(`Content-Type`, ContentTypeRegExp.JSON);

    expect(OffersRepository.getComments.mock.calls[0][0]).toBe(offerId);
    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toStrictEqual(getCommentsMethodResponse.body);
  });

  test(`test bad response`, async (done) => {
    const offerId = `offerIdTest`;
    const getCommentsMethodResponse = {
      isSuccess: false,
      body: {
        message: `Wrong`
      }
    };

    OffersRepository.getComments.mockReturnValue(getCommentsMethodResponse);

    const res = await request(app)
      .get(`/${offerId}/comments`)
      .expect(`Content-Type`, ContentTypeRegExp.HTML);

    expect(OffersRepository.getComments.mock.calls[0][0]).toBe(offerId);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.text).toBe(getCommentsMethodResponse.body.message);
    done();
  });
});

describe(`tests POST api/offers/:offerId/comments route`, () => {
  test(`test success response`, async () => {
    const offerId = `offerIdTest`;
    const postData = {
      id: `uzteRE_pDLf20LbIXZY-A`,
      type: `type`
    };

    const createCommentMethodResponse = {
      isSuccess: true,
      body: {
        id: `test id`,
        type: `test type`,
      }
    };

    OffersRepository.createComment.mockReturnValue(createCommentMethodResponse);

    const res = await request(app)
      .post(`/${offerId}/comments`)
      .send(postData)
      .expect(`Content-Type`, ContentTypeRegExp.JSON);

    expect(OffersRepository.createComment.mock.calls[0][0]).toBe(offerId);
    expect(OffersRepository.createComment.mock.calls[0][1]).toStrictEqual(postData);
    expect(res.statusCode).toBe(HttpCode.SUCCESS_POST);
    expect(res.body).toStrictEqual(createCommentMethodResponse.body);
  });

  test(`test bad response`, async (done) => {
    const offerId = `offerIdTest`;
    const postData = {
      id: `uzteRE_pDLf20LbIXZY-A`,
      type: `type`
    };

    const createCommentMethodResponse = {
      isSuccess: false,
      body: {
        message: `Wrong`
      }
    };

    OffersRepository.createComment.mockReturnValue(createCommentMethodResponse);

    const res = await request(app)
      .post(`/${offerId}/comments`)
      .send(postData)
      .expect(`Content-Type`, ContentTypeRegExp.HTML);

    expect(OffersRepository.createComment.mock.calls[0][0]).toBe(offerId);
    expect(OffersRepository.createComment.mock.calls[0][1]).toStrictEqual(postData);
    expect(res.statusCode).toBe(HttpCode.WRONG_QUERY);
    expect(res.text).toBe(createCommentMethodResponse.body.message);
    done();
  });
});

describe(`tests DELETE api/offers/:offerId/comments/:commentId route`, () => {
  test(`test success delete`, async (done) => {
    const offerId = `offerIdTest`;
    const commentId = `commentIdTest`;
    const deleteCommentMethodResponse = {
      isSuccess: true
    };

    OffersRepository.deleteComment.mockReturnValue(deleteCommentMethodResponse);

    const res = await request(app)
      .delete(`/${offerId}/comments/${commentId}`);

    expect(OffersRepository.deleteComment.mock.calls[0][0]).toBe(offerId);
    expect(OffersRepository.deleteComment.mock.calls[0][1]).toBe(commentId);
    expect(res.statusCode).toBe(HttpCode.SUCCESS_DELETE);
    expect(res.text).toBe(``);
    done();
  });

  test(`test wrong delete`, async (done) => {
    const offerId = `offerIdTest`;
    const commentId = `commentIdTest`;
    const deleteCommentMethodResponse = {
      isSuccess: false,
      body: {
        message: `Something is wrong`
      }
    };

    OffersRepository.deleteComment.mockReturnValue(deleteCommentMethodResponse);

    const res = await request(app)
      .delete(`/${offerId}/comments/${commentId}`);

    expect(OffersRepository.deleteComment.mock.calls[0][0]).toBe(offerId);
    expect(OffersRepository.deleteComment.mock.calls[0][1]).toBe(commentId);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.text).toBe(deleteCommentMethodResponse.body.message);
    done();
  });
});

describe(`tests GET api/offers/ route`, () => {
  test(`test success response`, async () => {
    const getAllMethodResponse = {
      isSuccess: true,
      body: [
        {
          id: `id1`,
          type: `type1`,
        },
        {
          id: `id2`,
          type: `type2`,
        }
      ]
    };

    OffersRepository.getAll.mockReturnValue(getAllMethodResponse);

    const res = await request(app).get(`/`).expect(`Content-Type`, ContentTypeRegExp.JSON);

    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toStrictEqual(getAllMethodResponse.body);
  });

  test(`test not found offers response`, async (done) => {
    const getByIdMethodResponse = {
      isSuccess: false,
      body: {
        message: `Wrong`
      }
    };

    OffersRepository.getAll.mockReturnValue(getByIdMethodResponse);

    const res = await request(app).get(`/`).expect(`Content-Type`, ContentTypeRegExp.HTML);

    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    expect(res.text).toBe(getByIdMethodResponse.body.message);
    done();
  });
});

describe(`tests POST /api/offers/ route`, () => {
  test(`test success response`, async (done) => {
    const postData = {
      id: `uzteRE_pDLf20LbIXZY-A`,
      type: `type`
    };

    const createMethodResponse = {
      isSuccess: true,
      body: {
        id: `test id`,
        type: `test type`,
      }
    };

    OffersRepository.create.mockReturnValue(createMethodResponse);

    const res = await request(app)
      .post(`/`)
      .send(postData)
      .expect(`Content-Type`, ContentTypeRegExp.JSON);

    expect(OffersRepository.create.mock.calls[0][0]).toStrictEqual(postData);
    expect(res.statusCode).toBe(HttpCode.SUCCESS_POST);
    expect(res.body).toStrictEqual(createMethodResponse.body);
    done();
  });

  test(`test wrong response`, async (done) => {
    const postData = {
      id: `uzteRE_pDLf20LbIXZY-A`,
      type: `type`
    };

    const createMethodResponse = {
      isSuccess: false,
      body: {
        message: `Wrong`
      }
    };

    OffersRepository.create.mockReturnValue(createMethodResponse);

    const res = await request(app)
      .post(`/`)
      .send(postData)
      .expect(`Content-Type`, ContentTypeRegExp.HTML);

    expect(OffersRepository.create.mock.calls[0][0]).toStrictEqual(postData);
    expect(res.statusCode).toBe(HttpCode.WRONG_QUERY);
    expect(res.text).toBe(createMethodResponse.body.message);
    done();
  });
});

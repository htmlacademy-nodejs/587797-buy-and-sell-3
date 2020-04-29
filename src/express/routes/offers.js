'use strict';

const fs = require(`fs`);
const axios = require(`axios`);
const {nanoid} = require(`nanoid`);
const path = require(`path`);

const {getLogger} = require(`../logger`);
const logger = getLogger();

const {Router} = require(`express`);

const {
  BASE_API_URL,
  HttpCode
} = require(`../../constants`);

const offersRouter = new Router();

offersRouter.get(`/add`, async (req, res) => {
  res.render(`offers/new-ticket`, {
    isAuth: true,
    categories: (await axios.get(`${BASE_API_URL}/api/categories`)).data,
    formData: {}
  });
});
offersRouter.post(`/add`, async (req, res, next) => {
  const requiredFields = [`title`, `description`, `categories`, `price`, `type`];
  const keysFromForm = Object.keys(req.fields);
  console.log(req.fields);

  const {type, size, path: filePath, name} = req.files.avatar;
  const allowTypes = [`image/jpeg`, `image/png`];

  if (size === 0 || !allowTypes.includes(type)) {
    logger.error(`Empty file or bad mime type. Size ${size}, mime: ${type}`);
    fs.unlink(filePath);

    res.render(`offers/new-ticket`, {
      isAuth: true,
      categories: (await axios.get(`${BASE_API_URL}/api/categories`)).data,
      formData: req.fields
    });
  }

  const newFileName = nanoid();
  console.log(req.files.avatar);

  try {
    let extension = ``;

    switch (true) {
      case type === `image/png`:
        extension = `.png`;

        break;
      case type === `image/jpeg`:
        extension = `.jpg`;

        break;
      default:
        throw new Error(`Unhandled file extension. File: ${name}`);
    }

    await fs.rename(filePath, path.resolve(__dirname, `../avatars/${newFileName}${extension}`), (error) => {
      if (error) {
        throw error;
      }

      logger.info(`File successfully renamed. Original filename: ${name}, generated filename: ${newFileName}`);
    });
  } catch (error) {
    logger.error(`Can't move file. Original filename: ${name}, generated filename: ${newFileName}. Error ${error}`);

    return res.render(`offers/new-ticket`, {
      isAuth: true,
      categories: (await axios.get(`${BASE_API_URL}/api/categories`)).data,
      formData: req.fields
    });
  }

  const areAllRequiredFieldsExist = requiredFields.every((requiredField) => keysFromForm.includes(requiredField));

  if (!areAllRequiredFieldsExist) {
    logger.error(`Not all required fields are presented. Fields: ${keysFromForm.toString()}`);

    return res.render(`offers/new-ticket`, {
      isAuth: true,
      categories: (await axios.get(`${BASE_API_URL}/api/categories`)).data,
      formData: req.fields
    });
  }

  logger.info(`Form is valid. Send post request to record data`);

  const postResponse = await axios
    .post(`${BASE_API_URL}/api/offers`, Object.assign({}, req.fields, {avatar: newFileName}));

  if (postResponse.status === HttpCode.SUCCESS_POST) {
    res.redirect(`/my`);
  } else {
    next(new Error(`Bad response status. ${postResponse.status}`));
  }
});
offersRouter.get(`/category/:id`, (req, res) => {
  res.render(`offers/category`, {
    isAuth: true
  });
});
offersRouter.get(`/edit/:id`, async (req, res, next) => {
  try {
    const offerResponse = await axios.get(`${BASE_API_URL}/api/offers/${req.params.id}`);
    const offer = offerResponse.data;

    const categoriesResponse = await axios.get(`${BASE_API_URL}/api/categories`);
    const categories = categoriesResponse.data;

    res.render(`offers/ticket-edit`, {
      isAuth: true,
      offer,
      categories
    });
  } catch (error) {
    if (error.response.status === HttpCode.NOT_FOUND) {
      next();
    } else {
      next(error);
    }
  }
});
offersRouter.get(`/:id`, async (req, res, next) => {
  try {
    const offerResponse = await axios.get(BASE_API_URL + `/api/offers/${req.params.id}`);
    const offer = offerResponse.data;

    res.render(`offers/ticket`, {
      isAuth: false,
      comments: [1],
      ticket: offer
    });
  } catch (error) {
    next(error);
  }
});

module.exports = offersRouter;

'use strict';

const fs = require(`fs`);
const axios = require(`axios`);
const path = require(`path`);
const multer = require(`multer`);
const mime = require(`mime/lite`);

const InvalidFormException = require(`../exceptions/invalid-form`);

const {getLogger} = require(`../logger`);
const logger = getLogger();

const {Router} = require(`express`);

const {
  BASE_API_URL,
  HttpCode
} = require(`../../constants`);

const {
  ITEMS_PICTURES_DIR,
  TMP_DIR
} = require(`../constants`);

const upload = multer({dest: TMP_DIR});

const offersRouter = new Router();

offersRouter.get(`/add`, async (req, res) => {
  res.render(`offers/new-ticket`, {
    isAuth: true,
    categories: (await axios.get(`${BASE_API_URL}/api/categories`)).data,
    formData: {}
  });
});
offersRouter.post(`/add`, upload.single(`avatar`), async (req, res, next) => {
  let newFilePath = null;

  try {
    logger.debug({message: `Got body`, content: req.body});
    logger.debug({message: `Got file`, content: req.file});

    const requiredFields = [`title`, `description`, `categories`, `price`, `type`];
    const keysFromForm = Object.keys(req.body);

    const {
      mimetype: mimeType,
      size,
      path: filePath,
      originalname: originalName,
      filename: generatedName
    } = req.file;

    if (size === 0 || ![`image/jpeg`, `image/png`].includes(mimeType)) {
      throw new InvalidFormException(`Empty file or bad mime type. Size ${size}, mimetype: ${mimeType}`);
    }

    const newFileName = `${generatedName}.${mime.getExtension(mimeType)}`;
    newFilePath = path.resolve(ITEMS_PICTURES_DIR, newFileName);

    await fs.promises.rename(filePath, newFilePath);
    logger.info(`File successfully renamed. Original filename: ${originalName}, generated filename: ${newFileName}`);

    const areAllRequiredFieldsExist = requiredFields.every((requiredField) => keysFromForm.includes(requiredField));

    if (!areAllRequiredFieldsExist) {
      throw new InvalidFormException(`Not all required fields are presented. Fields from form: ${keysFromForm.toString()}.
      Required fields: ${requiredFields.toString()}`);
    }

    logger.info(`Form is valid. Send post request to record data`);

    const postResponse = await axios
      .post(`${BASE_API_URL}/api/offers`, Object.assign({}, req.body, {avatar: newFileName}));

    logger.info(`Response status is ${postResponse.status}`);

    if (postResponse.status === HttpCode.SUCCESS_POST) {
      res.redirect(`/my`);
    } else {
      next(new Error(`Invalid response status code: ${postResponse.status}`));
    }
  } catch (caughtError) {
    fs.access(newFilePath, async (error) => {
      if (!error) {
        await fs.unlink(newFilePath, (fileError) => {
          if (fileError) {
            logger.error(`Can't delete file ${newFilePath}, error: ${fileError}`);

            return;
          }

          logger.info(`File ${newFilePath} successfully deleted`);
        });
      }
    });

    if (caughtError instanceof Error) {
      next(caughtError);

      return;
    }

    logger.error(caughtError.name);
    logger.error(caughtError.stack);

    res.render(`offers/new-ticket`, {
      isAuth: true,
      categories: (await axios.get(`${BASE_API_URL}/api/categories`)).data,
      formData: req.body
    });
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

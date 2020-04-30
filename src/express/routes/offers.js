'use strict';

const fs = require(`fs`);
const axios = require(`axios`);
const path = require(`path`);
const multer = require(`multer`);
const upload = multer({dest: path.resolve(__dirname, `../tmp`)});
const mime = require(`mime/lite`);

const AddOfferError = require(`../errors/add-offer-error`);

const {getLogger} = require(`../logger`);
const logger = getLogger();

const {Router} = require(`express`);

const {
  BASE_API_URL,
  HttpCode,
  ErrorCode
} = require(`../../constants`);

const offersRouter = new Router();

offersRouter.get(`/add`, async (req, res) => {
  res.render(`offers/new-ticket`, {
    isAuth: true,
    categories: (await axios.get(`${BASE_API_URL}/api/categories`)).data,
    formData: {}
  });
});
offersRouter.post(`/add`, upload.single(`avatar`), async (req, res, next) => {
  try {
    const requiredFields = [`title`, `description`, `categories`, `price`, `type`];
    const keysFromForm = Object.keys(req.body);

    const {mimetype, size, path: filePath, originalname, filename} = req.file;
    const allowTypes = [`image/jpeg`, `image/png`];

    const unlinkFile = async (pathToFile) => {
      await fs.unlink(pathToFile, (error) => {
        if (error) {
          if (error.code === ErrorCode.NO_FILE_OR_DIRECTORY) {
            logger.info(`File wasn't created`);
          } else {
            logger.error(error);
          }
        } else {
          logger.info(`File successfully deleted`);
        }
      });
    };

    if (size === 0 || !allowTypes.includes(mimetype)) {
      logger.error(`Empty file or bad mime type. Size ${size}, mimetype: ${mimetype}`);
      await unlinkFile(filePath);

      throw new AddOfferError();
    }

    const newFileName = `${filename}.${mime.getExtension(mimetype)}`;
    const newFilePath = path.resolve(__dirname, `../avatars/${newFileName}`);

    try {
      await fs.rename(filePath, newFilePath, (error) => {
        if (error) {
          throw error;
        }

        logger.info(`File successfully renamed. Original filename: ${originalname}, generated filename: ${newFileName}`);
      });
    } catch (error) {
      logger.error(`Can't move file. Original filename: ${originalname}, generated filename: ${newFileName}. Error ${error}`);

      throw new AddOfferError();
    }

    const areAllRequiredFieldsExist = requiredFields.every((requiredField) => keysFromForm.includes(requiredField));

    if (!areAllRequiredFieldsExist) {
      logger.error(`Not all required fields are presented. Fields: ${keysFromForm.toString()}`);
      await unlinkFile(newFilePath);

      throw new AddOfferError();
    }

    logger.info(`Form is valid. Send post request to record data`);

    try {
      const postResponse = await axios
        .post(`${BASE_API_URL}/api/offers`, Object.assign({}, req.body, {avatar: newFileName}));

      logger.info(`Response status is ${postResponse.status}`);
      if (postResponse.status === HttpCode.SUCCESS_POST) {
        res.redirect(`/my`);
      }
    } catch (error) {
      await unlinkFile(newFilePath);
      logger.error(error);
      throw new Error(`Can't save post data. Status: ${error.response.status}, message: ${error.response.data}`);
    }
  } catch (error) {
    if (error instanceof AddOfferError) {
      res.render(`offers/new-ticket`, {
        isAuth: true,
        categories: (await axios.get(`${BASE_API_URL}/api/categories`)).data,
        formData: req.body
      });
    } else {
      next(error.stack);
    }
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

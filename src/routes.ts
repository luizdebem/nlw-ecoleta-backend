import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import { celebrate, Joi } from 'celebrate'; // validação de dados

import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';

const routes = express.Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', upload.single('image'), celebrate({ body: Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  whatsapp: Joi.string().required(),
  lat: Joi.number().required(),
  lon: Joi.number().required(),
  city: Joi.string().required(),
  uf: Joi.string().required().max(2),
  items: Joi.string().required()
}) }, {
  abortEarly: false // valida tudo ao mesmo tempo
}), pointsController.create);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

export default routes;
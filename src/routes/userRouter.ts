import { Router } from 'express';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import UserController from '../controllers/UserController';
import UserService from '../service/UserService';
import UserValidations from '../validations/user/UserValidations';
import MissingParamError from '../errors/missing-param-error';
import UserSequelizeRepository from '../repositories/sequelize/UserSequelizeRepository';

const router = Router();

const userValidations = new UserValidations();
const userSequelizeRepository = new UserSequelizeRepository();
const userService = new UserService(userValidations, userSequelizeRepository);
const userController = new UserController(userService);

router
  .post(
    '/users',
    verifyRequiredFields('user'),
    userController.create.bind(userController),
  )
  .get('/users/:id', userController.getById.bind(userController))

export default router;

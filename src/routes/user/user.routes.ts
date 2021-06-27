import {Router} from 'express';
import {validatePermission} from '../../server/middlewares/validatePermission';
import {
  validateSchema,
  ValidateItem,
} from '../../server/middlewares/validateSchema';
import * as userSchema from './user.schema';
import UserController from './user.controller';

const router = Router();
const _userController = new UserController();

router.post(
  '/',
  validatePermission(true),
  validateSchema(userSchema.postUserSchema, ValidateItem.BODY),
  _userController.postUser()
);
router.get(
  '/',
  validatePermission(true),
  validateSchema(userSchema.getUserSchema, ValidateItem.BODY),
  _userController.getUser()
);
router.post(
  '/auth',
  validateSchema(userSchema.postAuthenticateSchema, ValidateItem.BODY),
  _userController.postUserAuthenticate()
);

export default router;

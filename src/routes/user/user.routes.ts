import {Router} from 'express';
import {validatePermission} from '../../server/middlewares/validatePermission';
import UserController from './user.controller';

const router = Router();
const _userController = new UserController();

router.post('/', validatePermission(true), _userController.postUser());
router.get('/', validatePermission(true), _userController.getUser());
router.post('/auth', _userController.postUserAuthenticate());

export default router;

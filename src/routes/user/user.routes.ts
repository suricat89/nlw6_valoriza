import {Router} from 'express';
import UserController from './user.controller';

const router = Router();
const _userController = new UserController();

router.post('/', _userController.postUser());

export default router;

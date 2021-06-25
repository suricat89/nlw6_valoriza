import {Router} from 'express';
import ComplimentController from './compliment.controller';
import {validatePermission} from '../../server/middlewares/validatePermission';

const router = Router();
const _complimentController = new ComplimentController();

router.post('/', validatePermission(), _complimentController.postCompliment());

export default router;

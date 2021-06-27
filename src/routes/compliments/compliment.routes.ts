import {Router} from 'express';
import ComplimentController from './compliment.controller';
import {validatePermission} from '../../server/middlewares/validatePermission';

const router = Router();
const _complimentController = new ComplimentController();

router.post('/', validatePermission(), _complimentController.postCompliment());
router.get(
  '/list/received/:userId',
  validatePermission(),
  _complimentController.getComplimentReceived()
);
router.get(
  '/list/sent/:userId',
  validatePermission(),
  _complimentController.getComplimentSent()
);

export default router;

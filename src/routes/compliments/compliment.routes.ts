import {Router} from 'express';
import ComplimentController from './compliment.controller';
import {validatePermission} from '../../server/middlewares/validatePermission';
import {
  validateSchema,
  ValidateItem,
} from '../../server/middlewares/validateSchema';
import * as complimentSchema from './compliment.schema';

const router = Router();
const _complimentController = new ComplimentController();

router.post(
  '/',
  validatePermission(),
  validateSchema(complimentSchema.postComplimentSchema, ValidateItem.BODY),
  _complimentController.postCompliment()
);
router.get(
  '/list/received/:userId',
  validatePermission(),
  validateSchema(
    complimentSchema.getComplimentReceivedSchema,
    ValidateItem.QUERY
  ),
  _complimentController.getComplimentReceived()
);
router.get(
  '/list/sent/:userId',
  validatePermission(),
  validateSchema(complimentSchema.getComplimentSentSchema, ValidateItem.QUERY),
  _complimentController.getComplimentSent()
);

export default router;

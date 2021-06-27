import {Router} from 'express';
import TagController from './tag.controller';
import {validatePermission} from '../../server/middlewares/validatePermission';
import {
  validateSchema,
  ValidateItem,
} from '../../server/middlewares/validateSchema';
import * as tagSchema from './tag.schema';

const router = Router();
const _tagController = new TagController();

router.post(
  '/',
  validatePermission(true),
  validateSchema(tagSchema.postTagSchema, ValidateItem.BODY),
  _tagController.postTag()
);
router.get(
  '/',
  validatePermission(),
  validateSchema(tagSchema.getTagSchema, ValidateItem.BODY),
  _tagController.getTag()
);

export default router;

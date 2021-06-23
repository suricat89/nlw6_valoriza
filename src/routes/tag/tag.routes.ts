import {Router} from 'express';
import TagController from './tag.controller';
import {validatePermission} from '../../server/middlewares/validatePermission';

const router = Router();
const _tagController = new TagController();

router.post('/', validatePermission(), _tagController.postTag());

export default router;

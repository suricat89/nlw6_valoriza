import {Router} from 'express';
import TagController from './tag.controller';
import {validatePermission} from '../../server/middlewares/validatePermission';

const router = Router();
const _tagController = new TagController();

router.post('/', validatePermission(true), _tagController.postTag());
router.get('/', validatePermission(), _tagController.getTag());

export default router;

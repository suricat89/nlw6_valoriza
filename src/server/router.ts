import {Router} from 'express';
import userRouter from '../routes/user/user.routes';
import tagRouter from '../routes/tag/tag.routes';

const router = Router();

router.get('/ping', (req, res) => {
  return res.json('pong');
});

router.use('/user', userRouter);
router.use('/tag', tagRouter);

export default router;

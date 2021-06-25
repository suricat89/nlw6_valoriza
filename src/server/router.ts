import {Router} from 'express';
import userRouter from '../routes/user/user.routes';
import tagRouter from '../routes/tag/tag.routes';
import complimentRouter from '../routes/compliments/compliment.routes';

const router = Router();

router.get('/ping', (req, res) => {
  return res.json('pong');
});

router.use('/user', userRouter);
router.use('/tag', tagRouter);
router.use('/compliment', complimentRouter);

export default router;

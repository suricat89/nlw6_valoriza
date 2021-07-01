import {Router} from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import userRouter from '../routes/user/user.routes';
import tagRouter from '../routes/tag/tag.routes';
import complimentRouter from '../routes/compliments/compliment.routes';

const router = Router();
const swaggerDocument = yaml.load('src/docs/swagger.yml');

router.get('/ping', (req, res) => {
  return res.json('pong');
});

router.use('/user', userRouter);
router.use('/tag', tagRouter);
router.use('/compliment', complimentRouter);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

export default router;

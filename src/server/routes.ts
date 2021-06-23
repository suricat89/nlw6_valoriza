import {Application} from 'express';
import userRouter from '../routes/user/user.routes';

export default (app: Application) => {
  app.get('/ping', (req, res) => {
    return res.json('pong');
  });

  app.use('/user', userRouter);
};

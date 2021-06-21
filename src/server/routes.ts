import {Application} from 'express';

export default (app: Application) => {
  app.get('/ping', (req, res) => {
    return res.json('pong');
  });
};

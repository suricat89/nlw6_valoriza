import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import environment from '../config/environment';
import routes from './routes';

export const _initApp = async () => {
  const app = express();
  const logger = pino();

  app.use(pinoHttp({logger}));
  routes(app);

  return app;
};

export const bootstrap = async () => {
  const app = await _initApp();
  app.listen(environment.application.port, () =>
    console.log(`Server listening on port ${environment.application.port}`)
  );
};

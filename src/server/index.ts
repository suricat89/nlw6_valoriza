import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express from 'express';
import 'express-async-errors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import environment from '../config/environment';
import router from './router';
import {errorHandler} from './middlewares/errorHandler';
import CreateSuperUserService from '../routes/user/services/CreateSuperUserService';

export const _initApp = async () => {
  const app = express();
  const logger = pino();

  app.use(express.json());
  app.use(pinoHttp({logger}));
  app.use(router);

  app.use(errorHandler);

  return app;
};

const _initDatabase = async () => {
  const connection = await createConnection();
  const createSuperUserService = new CreateSuperUserService();
  await createSuperUserService.execute();
  return connection;
};

export const bootstrap = async () => {
  await _initDatabase();
  const app = await _initApp();
  app.listen(environment.application.port, () =>
    console.log(`Server listening on port ${environment.application.port}`)
  );
};

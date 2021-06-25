// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {StatusCodes} from 'http-status-codes';
import {_initApp} from '../../../server/';
import {databaseConnection} from '../../../../jest/global';

let app: Express.Application;
beforeAll(async () => {
  app = await _initApp();
  await databaseConnection.create();
  // await databaseConnection.clear();
});

afterAll(async () => {
  await databaseConnection.close();
});

describe('POST /user', () => {
  describe('Insert user with success', () => {
    it('[HTTP 200] should insert user with success', async () => {
      const response = await agent(app).post('/user').send({
        name: 'Test user 1',
        password: '123',
        email: 'test@email.com',
        admin: true,
      });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.admin).toBeTruthy();
    });

    it('[HTTP 200] should insert user with success with default admin = false', async () => {
      const response = await agent(app).post('/user').send({
        name: 'Test user 2',
        password: '123',
        email: 'test2@email.com',
      });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.admin).toBeFalsy();
    });
  });

  describe('Insert user with error', () => {
    it('[HTTP 400] should return an error if email already exists', async () => {
      const response = await agent(app).post('/user').send({
        name: 'Another user',
        password: '123',
        email: 'test@email.com',
        admin: false,
      });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('[HTTP 400] should return an error if email is not provided', async () => {
      const response = await agent(app).post('/user').send({
        name: 'Another user',
        password: '123',
        admin: false,
      });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});

describe('POST /user/auth', () => {
  describe('Authenticate user with success', () => {
    it('[HTTP 200] should authenticate user with success', async () => {
      const response = await agent(app).post('/user/auth').send({
        email: 'test@email.com',
        password: '123',
      });

      expect(response.status).toBe(StatusCodes.OK);
    });
  });

  describe('Authenticate user with error', () => {
    it('[HTTP 400] should return an error if email is incorrect', async () => {
      const response = await agent(app).post('/user/auth').send({
        email: 'invalid_test@email.com',
        password: '123',
      });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('[HTTP 400] should return an error if password is incorrect', async () => {
      const response = await agent(app).post('/user/auth').send({
        email: 'test@email.com',
        password: 'incorrect_password',
      });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});

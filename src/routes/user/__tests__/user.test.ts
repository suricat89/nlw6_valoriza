// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {StatusCodes} from 'http-status-codes';
import {_initApp} from '../../../server/';
import {databaseConnection} from '../../../../jest/global';

let app: Express.Application;
beforeAll(async () => {
  app = await _initApp();
  await databaseConnection.create();
  await databaseConnection.clear();
});

afterAll(async () => {
  await databaseConnection.clear();
  await databaseConnection.close();
});

describe('POST /user', () => {
  describe('Insert user with success', () => {
    it('[HTTP 200] should insert user with success', async () => {
      const response = await agent(app).post('/user').send({
        name: 'Test user',
        email: 'test@email.com',
        admin: false,
      });

      expect(response.status).toBe(StatusCodes.OK);
    });
  });
});

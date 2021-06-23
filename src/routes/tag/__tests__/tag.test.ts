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

describe('POST /tag', () => {
  describe('Insert tag with success', () => {
    it('[HTTP 200] should insert tag with success', async () => {
      const response = await agent(app).post('/tag').send({
        name: 'Test tag',
      });

      expect(response.status).toBe(StatusCodes.OK);
    });
  });

  describe('Insert tag with error', () => {
    it('[HTTP 400] should return an error if tag name already exists', async () => {
      const response = await agent(app).post('/tag').send({
        name: 'Test tag',
      });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('[HTTP 400] should return an error if tag name is not provided', async () => {
      const response = await agent(app).post('/tag');

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});

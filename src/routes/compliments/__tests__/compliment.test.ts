// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {StatusCodes} from 'http-status-codes';
import {_initApp} from '../../../server/';
import User from '../../user/user.model';
import Tag from '../../tag/tag.model';
import {insertTestTags, insertTestUsers} from './setupTests';
import {databaseConnection} from '../../../../jest/global';

let testUsers: User[];
let testTags: Tag[];
let app: Express.Application;

beforeAll(async () => {
  app = await _initApp();
  await databaseConnection.create();
  // await databaseConnection.clear();
  testUsers = await insertTestUsers(app);
  testTags = await insertTestTags(app);
});

afterAll(async () => {
  await databaseConnection.close();
});

describe('POST /compliment', () => {
  describe('Insert compliment with success', () => {
    it('[HTTP 200] should insert compliment with success', async () => {
      const response = await agent(app).post('/compliment').send({
        tagId: testTags[0].id,
        userSender: testUsers[0].id,
        userReceiver: testUsers[1].id,
        message: 'Test compliment',
      });

      expect(response.status).toBe(StatusCodes.OK);
    });
  });

  describe('Insert compliment with error', () => {
    it('[HTTP 400] should return an error if receiver and send user are the same', async () => {
      const response = await agent(app).post('/compliment').send({
        tagId: testTags[0].id,
        userSender: testUsers[0].id,
        userReceiver: testUsers[0].id,
        message: 'Test compliment',
      });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('[HTTP 400] should return an error if receiver user does not exist', async () => {
      const response = await agent(app).post('/compliment').send({
        tagId: testTags[0].id,
        userSender: testUsers[0].id,
        userReceiver: 'c4a7f632-8819-4ecc-86ac-d22fe07bc328',
        message: 'Test compliment',
      });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('[HTTP 400] should return an error if sender user does not exist', async () => {
      const response = await agent(app).post('/compliment').send({
        tagId: testTags[0].id,
        userSender: 'c4a7f632-8819-4ecc-86ac-d22fe07bc328',
        userReceiver: testUsers[0].id,
        message: 'Test compliment',
      });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});

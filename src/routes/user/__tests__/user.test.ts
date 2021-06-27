// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {StatusCodes} from 'http-status-codes';
import {_initApp} from '../../../server/';
import {databaseConnection, generateToken} from '../../../../jest/global';
import User from '../user.model';
import ListUserService from '../services/ListUsersService';
import usersData from '../__data__/user.data';

let app: Express.Application;
interface ITestData {
  adminUser: User;
  nonAdminUser: User;
  adminToken: string;
  nonAdminToken: string;
}
const testData = {} as ITestData;

beforeAll(async () => {
  app = await _initApp();
  await databaseConnection.create();

  const listUserService = new ListUserService();
  testData.adminUser = (
    await listUserService.execute({admin: true} as User)
  ).pop();
  testData.nonAdminUser = (
    await listUserService.execute({admin: false} as User)
  ).pop();
  testData.adminToken = await generateToken(testData.adminUser.email, '123');
  testData.nonAdminToken = await generateToken(
    testData.nonAdminUser.email,
    '123'
  );
});

afterAll(async () => {
  await databaseConnection.close();
});

describe('POST /user', () => {
  describe('Insert user with success', () => {
    it('[POST_S_001] [HTTP 200] should insert user with success', async () => {
      const response = await agent(app)
        .post('/user')
        .set('Authorization', testData.adminToken)
        .send(usersData.POST_S_001.request);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.admin).toBeTruthy();
    });

    it('[POST_S_002] [HTTP 200] should insert user with success with default admin = false', async () => {
      const response = await agent(app)
        .post('/user')
        .set('Authorization', testData.adminToken)
        .send(usersData.POST_S_002.request);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.admin).toBeFalsy();
    });
  });

  describe('Insert user with error', () => {
    it('[POST_E_001] [HTTP 400] should return an error if email already exists', async () => {
      const response = await agent(app)
        .post('/user')
        .set('Authorization', testData.adminToken)
        .send(usersData.POST_E_001.request);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('[POST_E_002] [HTTP 400] should return an error if email is not provided', async () => {
      const response = await agent(app)
        .post('/user')
        .set('Authorization', testData.adminToken)
        .send(usersData.POST_E_002.request);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});

describe('POST /user/auth', () => {
  describe('Authenticate user with success', () => {
    it('[POST_AUTH_S_001] [HTTP 200] should authenticate user with success', async () => {
      const response = await agent(app)
        .post('/user/auth')
        .send(usersData.POST_AUTH_S_001.request);

      expect(response.status).toBe(StatusCodes.OK);
    });
  });

  describe('Authenticate user with error', () => {
    it('[POST_AUTH_E_001] [HTTP 400] should return an error if email is incorrect', async () => {
      const response = await agent(app)
        .post('/user/auth')
        .send(usersData.POST_AUTH_E_001.request);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('[POST_AUTH_E_002] [HTTP 400] should return an error if password is incorrect', async () => {
      const response = await agent(app)
        .post('/user/auth')
        .send(usersData.POST_AUTH_E_002.request);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});

describe('GET /user', () => {
  describe('List users with success', () => {
    it('[GET_S_001] [HTTP 200] should list all users', async () => {
      const response = await agent(app)
        .get('/user')
        .set('Authorization', testData.adminToken);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThan(1);
    });

    it('[GET_S_002] [HTTP 200] should list a single user', async () => {
      const response = await agent(app)
        .get('/user')
        .set('Authorization', testData.adminToken)
        .query(usersData.GET_S_002.request);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBe(1);
    });
  });
});

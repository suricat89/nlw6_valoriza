// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {StatusCodes} from 'http-status-codes';
import {_initApp} from '../../../server/';
import {databaseConnection, generateToken} from '../../../../jest/global';
import User from '../../user/user.model';
import ListUserService from '../../user/services/ListUsersService';
import tagsData from '../__data__/tag.data';

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

describe('POST /tag', () => {
  describe('Insert tag with success', () => {
    it('[POST_S_001] [HTTP 200] should insert tag with success', async () => {
      const response = await agent(app)
        .post('/tag')
        .set('Authorization', testData.adminToken)
        .send(tagsData.POST_S_001.request);

      expect(response.status).toBe(StatusCodes.OK);
    });
  });

  describe('Insert tag with error', () => {
    it('[POST_E_001] [HTTP 412] should return an error if tag name already exists', async () => {
      const response = await agent(app)
        .post('/tag')
        .set('Authorization', testData.adminToken)
        .send(tagsData.POST_E_001.request);

      expect(response.status).toBe(StatusCodes.PRECONDITION_FAILED);
    });

    it('[POST_E_002] [HTTP 400] should return an error if tag name is not provided', async () => {
      const response = await agent(app)
        .post('/tag')
        .set('Authorization', testData.adminToken);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});

describe('GET /tag', () => {
  describe('Get tag list with successs', () => {
    it('[GET_S_001] [HTTP 200] should list all tags', async () => {
      const response = await agent(app)
        .get('/tag')
        .set('Authorization', testData.adminToken);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('[GET_S_002] [HTTP 200] should list a single tag', async () => {
      const response = await agent(app)
        .get('/tag')
        .query(tagsData.GET_S_002.request)
        .set('Authorization', testData.adminToken);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBe(1);
    });
  });
});

// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {StatusCodes} from 'http-status-codes';
import {_initApp} from '../../../server/';
import {databaseConnection, generateToken} from '../../../../jest/global';
import User from '../../user/user.model';
import Tag from '../../tag/tag.model';
import ListUserService from '../../user/services/ListUsersService';
import ListTagService from '../../tag/services/ListTagService';
import complimentsData from '../__data__/compliments.data';

let app: Express.Application;
export interface ITestData {
  adminUser: User;
  nonAdminUser: User;
  tag: Tag;
  adminToken: string;
  nonAdminToken: string;
}
const testData = {} as ITestData;

beforeAll(async () => {
  app = await _initApp();
  await databaseConnection.create();

  const listUserService = new ListUserService();
  const listTagService = new ListTagService();
  testData.adminUser = (
    await listUserService.execute({admin: true} as User)
  ).pop();
  testData.nonAdminUser = (
    await listUserService.execute({admin: false} as User)
  ).pop();
  testData.tag = (await listTagService.execute()).pop();
  testData.adminToken = await generateToken(testData.adminUser.email, '123');
  testData.nonAdminToken = await generateToken(
    testData.nonAdminUser.email,
    '123'
  );
});

afterAll(async () => {
  await databaseConnection.close();
});

describe('POST /compliment', () => {
  describe('Insert compliment with success', () => {
    it('[POST_S_001] [HTTP 200] should insert compliment with success', async () => {
      const response = await agent(app)
        .post('/compliment')
        .set('Authorization', testData.adminToken)
        .send(complimentsData.POST_S_001.request(testData));

      expect(response.status).toBe(StatusCodes.OK);
    });
  });

  describe('Insert compliment with error', () => {
    it('[POST_E_001] [HTTP 412] should return an error if receiver and send user are the same', async () => {
      const response = await agent(app)
        .post('/compliment')
        .set('Authorization', testData.nonAdminToken)
        .send(complimentsData.POST_E_001.request(testData));

      expect(response.status).toBe(StatusCodes.PRECONDITION_FAILED);
    });

    it('[POST_E_002] [HTTP 412] should return an error if receiver user does not exist', async () => {
      const response = await agent(app)
        .post('/compliment')
        .set('Authorization', testData.nonAdminToken)
        .send(complimentsData.POST_E_002.request(testData));

      expect(response.status).toBe(StatusCodes.PRECONDITION_FAILED);
    });
  });
});

describe('GET /compliment/received/:userId', () => {
  describe('List received compliments with success', () => {
    it(`[GET_RECEIVED_S_001] [HTTP 200] should list 
       received compliments successfully`, async () => {
      let url = '/compliment/list/received/';
      url += testData.nonAdminUser.id;

      const response = await agent(app)
        .get(url)
        .set('Authorization', testData.nonAdminToken);

      expect(response.status).toBe(StatusCodes.OK);
    });
  });
});

describe('GET /compliment/sent/:userId', () => {
  describe('List sent compliments with success', () => {
    it(`[GET_SENT_S_001] [HTTP 200] should list 
       sent compliments successfully`, async () => {
      let url = '/compliment/list/sent/';
      url += testData.nonAdminUser.id;

      const response = await agent(app)
        .get(url)
        .set('Authorization', testData.nonAdminToken);

      expect(response.status).toBe(StatusCodes.OK);
    });
  });
});

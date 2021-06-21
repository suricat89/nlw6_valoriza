// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {StatusCodes} from 'http-status-codes';
import {_initApp} from '../';

let app: Express.Application;
beforeAll(async () => {
  app = await _initApp();
});

describe('GET /ping', () => {
  it('[HTTP 200] should ping', async () => {
    const response = await agent(app).get('/ping');

    expect(response.status).toBe(StatusCodes.OK);
  });
});

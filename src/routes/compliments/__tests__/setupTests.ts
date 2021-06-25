// eslint-disable-next-line node/no-unpublished-import
import {agent} from 'supertest';
import {Express} from 'express';
import User from '../../user/user.model';
import Tag from '../../tag/tag.model';

export const insertTestUsers = async (app: Express.Application) => {
  const user1 = await agent(app).post('/user').send({
    name: 'Compliment test user 1',
    password: '123',
    email: 'compliment.test.user.1@email.com',
  });

  const user2 = await agent(app).post('/user').send({
    name: 'Compliment test user 2',
    password: '123',
    email: 'compliment.test.user.2@email.com',
  });

  return [user1.body as User, user2.body as User];
};

export const insertTestTags = async (app: Express.Application) => {
  const tag = await agent(app).post('/tag').send({
    name: 'Compliment test tag',
  });

  return [tag.body as Tag];
};

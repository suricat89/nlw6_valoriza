import {createConnection, getConnection} from 'typeorm';
import environment from '../src/config/environment';
import CreateTagService from '../src/routes/tag/services/CreateTagService';
import AuthenticateUserService from '../src/routes/user/services/AuthenticateUserService';
import CreateUserService from '../src/routes/user/services/CreateUserService';
import userData from '../src/routes/user/__data__/user.data';
import tagData from '../src/routes/tag/__data__/tag.data';
import ListUserService from '../src/routes/user/services/ListUsersService';
import ListTagService from '../src/routes/tag/services/ListTagService';
import User from '../src/routes/user/user.model';
import Tag from '../src/routes/tag/tag.model';

export const configTestDatabase = () => {
  environment.database = {
    type: 'postgres',
    host: 'localhost',
    port: 15433,
    username: 'admin',
    password: 'test',
    database: 'nlw6_valoriza',
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/**/*.model.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
    migrationsRun: true,
  };
};

export const databaseConnection = {
  async create() {
    configTestDatabase();
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    let entities = connection.entityMetadatas;
    const sequenceEntities = ['compliments', 'users', 'tags'];

    entities = entities.sort((a, b) => {
      const sequenceA = sequenceEntities.indexOf(a.tableName);
      const sequenceB = sequenceEntities.indexOf(b.tableName);
      return sequenceA - sequenceB;
    });

    for (let i = 0, length = entities.length; i < length; i++) {
      const entity = entities[i];

      console.log(`Cleaning table "${entity.tableName}"`);
      const repository = connection.getRepository(entity.name);
      const resultDelete = await repository.query(
        `DELETE FROM ${entity.tableName}`
      );
      console.log(
        `Table "${entity.tableName}" cleaned successfully: `,
        resultDelete
      );
    }
  },
};

const insertTestUsers = async () => {
  const createUserService = new CreateUserService();
  const listUserService = new ListUserService();

  for (let i = 0, length = userData.initialUsers.length; i < length; i++) {
    const user = userData.initialUsers[i];
    const hasUser = await listUserService.execute({email: user.email} as User);
    if (!hasUser || !hasUser.length) {
      createUserService.execute(user);
    }
  }
};

const insertTestTags = async () => {
  const createTagService = new CreateTagService();
  const listTagService = new ListTagService();

  for (let i = 0, length = tagData.initialTags.length; i < length; i++) {
    const tag = tagData.initialTags[i];
    const hasTag = await listTagService.execute({name: tag.name} as Tag);
    if (!hasTag || !hasTag.length) {
      createTagService.execute(tag);
    }
  }
};

export const generateToken = async (
  email: string,
  password: string,
  valid = true
) => {
  environment.jwt.expiresIn = valid ? null : '0';

  const authenticateUserService = new AuthenticateUserService();
  const token = await authenticateUserService.execute({email, password});
  return token;
};

export const populateTestData = async () => {
  await insertTestUsers();
  await insertTestTags();
};

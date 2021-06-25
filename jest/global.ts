import {createConnection, getConnection} from 'typeorm';
import environment from '../src/config/environment';

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
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async entity => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};

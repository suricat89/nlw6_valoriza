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

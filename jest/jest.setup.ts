import environment from '../src/config/environment';

jest.setTimeout(30000);

const configTestDatabase = () => {
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

configTestDatabase();

import {ConnectionOptions} from 'typeorm';

export default {
  application: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '5000',
  },
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number.parseInt(process.env.DATABASE_PORT) || 15432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'development',
    databaseName: process.env.DATABASE_DATABASENAME || 'postgres',
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/**/*.model.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  } as ConnectionOptions,
};

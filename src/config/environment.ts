import {ConnectionOptions} from 'typeorm';

export default {
  application: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '5000',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'test',
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number.parseInt(process.env.DATABASE_PORT) || 15432,
    username: process.env.DATABASE_USERNAME || 'admin',
    password: process.env.DATABASE_PASSWORD || 'development',
    ssl: process.env.NODE_ENV === 'production' ? true : false,
    database: process.env.DATABASE_DATABASENAME || 'nlw6_valoriza',
    migrations: ['src/database/migrations/*{.js, .ts}'],
    entities: ['src/**/*.model{.js, .ts}'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  } as ConnectionOptions,
};

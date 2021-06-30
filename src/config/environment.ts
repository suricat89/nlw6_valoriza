import {ConnectionOptions} from 'typeorm';

const databaseProduction = {
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: ['build/src/database/migrations/*.js'],
  entities: ['build/src/**/*.model.js'],
  cli: {
    migrationsDir: 'build/src/database/migrations',
  },
} as ConnectionOptions;

const databaseDevelopment = {
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/**/*.model.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
} as ConnectionOptions;

const nodeEnv = process.env.NODE_ENV || 'development';

const databaseSpecificEnv =
  nodeEnv === 'production' ? databaseProduction : databaseDevelopment;

export default {
  application: {
    nodeEnv,
    port: process.env.PORT || '5000',
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD || '12345678',
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
    database: process.env.DATABASE_DATABASENAME || 'nlw6_valoriza',
    ...databaseSpecificEnv,
  } as ConnectionOptions,
};

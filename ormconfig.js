const databaseOptions = {
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number.parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'admin',
  password: process.env.DATABASE_PASSWORD || 'development',
  database: process.env.DATABASE_DATABASENAME || 'nlw6_valoriza',
  migrationsRun: true,
  migrations: ['build/src/database/migrations/*.js'],
  entities: ['build/src/**/**.model.js'],
  cli: {
    migrationsDir: 'build/src/database/migrations',
  },
};

const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'production') {
  Object.assign(databaseOptions, {
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

const typescriptNodeEnvs = ['development', 'test'];
if (typescriptNodeEnvs.indexOf(nodeEnv) !== -1) {
  Object.assign(databaseOptions, {
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/**/**.model.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  });
}

module.exports = databaseOptions;

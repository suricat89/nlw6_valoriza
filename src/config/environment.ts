export default {
  application: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '5000',
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD || '12345678',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'test',
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};

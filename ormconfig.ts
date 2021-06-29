let environment;
try {
  environment = require('./src/config/environment').default;
} catch (error) {
  // eslint-disable-next-line node/no-unpublished-require
  environment = require('./build/src/config/environment').default;
}

module.exports = {
  ...environment.database,
};

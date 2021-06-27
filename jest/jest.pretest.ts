import {waterfall} from 'async';
import {
  configTestDatabase,
  databaseConnection,
  populateTestData,
} from './global';

waterfall([
  (callback: Function) => {
    configTestDatabase();
    callback();
  },
  (callback: Function) => {
    databaseConnection.create().then(() => callback(null));
  },
  (callback: Function) => {
    databaseConnection.clear().then(() => callback(null));
  },
  (callback: Function) => {
    populateTestData().then(() => callback(null));
  },
]);

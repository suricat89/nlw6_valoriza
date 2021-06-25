import {configTestDatabase, databaseConnection} from './global';
import {waterfall} from 'async';

configTestDatabase();

waterfall([
  (callback: Function) => {
    databaseConnection.create().then(() => callback(null));
  },
  (callback: Function) => {
    databaseConnection.clear().then(() => callback(null));
  },
]);

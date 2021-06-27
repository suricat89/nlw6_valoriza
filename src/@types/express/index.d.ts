import {IJwtData} from '../../common/types';

declare global {
  namespace Express {
    export interface Request {
      authenticated: IJwtData;
    }
  }
}

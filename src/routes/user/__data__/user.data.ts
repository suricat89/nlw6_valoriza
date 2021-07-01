import {UserModel} from '../user.model';

export default {
  initialUsers: [
    {
      name: 'Test user 1',
      email: 'test.user.1@email.com',
      password: '123',
      admin: true,
    },
    {
      name: 'Test user 2',
      email: 'test.user.2@email.com',
      password: '123',
    },
  ] as UserModel[],
  POST_S_001: {
    request: {
      name: 'Another user 1',
      password: '123',
      email: 'test@email.com',
      admin: true,
    },
  },
  POST_S_002: {
    request: {
      name: 'Another user 2',
      password: '123',
      email: 'test2@email.com',
    },
  },
  POST_E_001: {
    request: {
      name: 'Another user',
      password: '123',
      email: 'test@email.com',
      admin: false,
    },
  },
  POST_E_002: {
    request: {
      name: 'Another user',
      password: '123',
      admin: false,
    },
  },
  POST_AUTH_S_001: {
    request: {
      email: 'test@email.com',
      password: '123',
    },
  },
  POST_AUTH_E_001: {
    request: {
      email: 'invalid_test@email.com',
      password: '123',
    },
  },
  POST_AUTH_E_002: {
    request: {
      email: 'test@email.com',
      password: 'incorrect_password',
    },
  },
  GET_S_002: {
    request: {
      email: 'test.user.1@email.com',
    },
  },
};

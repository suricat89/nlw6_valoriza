import {TagModel} from '../tag.model';

export default {
  initialTags: [
    {
      name: 'Test tag 1',
    },
  ] as TagModel[],
  POST_S_001: {
    request: {
      name: 'Test tag',
    },
  },
  POST_E_001: {
    request: {
      name: 'Test tag',
    },
  },
  GET_S_002: {
    request: {
      name: 'Test tag 1',
    },
  },
};

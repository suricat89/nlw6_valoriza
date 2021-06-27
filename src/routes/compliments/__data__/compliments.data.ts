import {ITestData} from '../__tests__/compliment.test';

export default {
  POST_S_001: {
    request: (testData: ITestData) => ({
      tagId: testData.tag.id,
      userReceiver: testData.nonAdminUser.id,
      message: 'Test compliment',
    }),
  },
  POST_E_001: {
    request: (testData: ITestData) => ({
      tagId: testData.tag.id,
      userReceiver: testData.nonAdminUser.id,
      message: 'Test compliment',
    }),
  },
  POST_E_002: {
    request: (testData: ITestData) => ({
      tagId: testData.tag.id,
      userReceiver: 'c4a7f632-8819-4ecc-86ac-d22fe07bc328',
      message: 'Test compliment',
    }),
  },
};

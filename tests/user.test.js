const axios = require('axios');
const request = require('supertest');

const { mysqlDatabase } = require('../api/models/dbconfig');
const { createApp } = require('../app');

describe('SOCIAL-LOGIN', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await mysqlDatabase.initialize();
  });

  afterAll(async () => {
    await mysqlDatabase.query(`SET foreign_key_checks = 0`);
    await mysqlDatabase.query(`TRUNCATE users`);
    await mysqlDatabase.query(`SET foreign_key_checks = 1`);
    await mysqlDatabase.destroy();
  });

  test('FAILED : LOGIN_FAILED_DUE_TO_NONE_ACCESS_TOKEN', async () => {
    const response = await request(app).post('/auth/login');

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({ message: 'NONE_KAKAO_TOKEN' });
  });

  test('SUCCESS: LOGIN_SUCCESS_WITH_TOKEN', async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: 123456,
        properties: {
          profile_image: 'abcdefghijk.png',
          nickname: '김승기',
        },
        kakao_account: {
          email: 'seuungkei@gmail.com',
        },
      },
    });

    await request(app).post('/auth/login').set({ authorization: 'MOCK_ACCESS_TOKEN' }).expect(200);
  });

  test('FAILED : LOGIN_FAILED_NO_KAKAO_USER_INFO_CANNOT_CREATE_USER', async () => {
    axios.get = jest.fn().mockReturnValue();

    await request(app).post('/auth/login').set({ authorization: 'MOCK_ACCESS_TOKEN' }).expect(400);
  });
});

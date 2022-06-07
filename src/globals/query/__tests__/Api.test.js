import { expect } from '@jest/globals';
import serviceAccessToken from '../AccessToken';
import api from '../API';

test('send login with chris@test.com / password', async () => {
  const userInput = { email: 'chris@test.com', password: 'password' };
  const res = await api.send('POST', '/api/v1/auth/login', userInput);
  expect(res.status).toEqual(200);
});

test('should get a -1 error', async () => {
  const res = await api.send('GET', '/api/v1/profile');
  expect(res.status).toEqual(-1);
});

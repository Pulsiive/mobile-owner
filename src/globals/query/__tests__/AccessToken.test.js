import { expect } from '@jest/globals';
import serviceAccessToken from '../AccessToken';

test('should retrieve null accessToken when is not set', async () => {
  const accessToken = await serviceAccessToken.get();
  expect(accessToken).toBeNull();
});

test('should set accessToken and get value', async () => {
  serviceAccessToken.set('test');
  const accessToken = await serviceAccessToken.get();
  expect(accessToken).toEqual('test');
});

test('should set, get and remove accessToken', async () => {
  serviceAccessToken.set('test');
  serviceAccessToken.remove();
  const accessToken = await serviceAccessToken.get();
  expect(accessToken).toBeNull();
});

import fetch from 'cross-fetch';
import { generateJwt } from './utils/jwtGenerator';
import { register } from './utils/register';

describe('user can update his profile', () => {
  let userAToken: string;
  let userBToken = generateJwt('free_user', 'userB');
  let adminToken = generateJwt('admin', 'userAdmin');

  const updateProfile = async (id: string) => {
    const res = await fetch(`/api/profile/${id}`, {
      method: 'PUT',
      headers: {
        credentials: 'include',
      },
    });
  };

  it('should create a user', async () => {
    const res = await register({
      email: 'email4@test.fr',
      username: 'test4',
      password: 'Test123!',
    });
    const data = await res.json();
    userAToken = data.token;
    expect(res.status).toEqual(201);
  });

  describe('when a user B tries to update user A profile', () => {
    it('should return a code 403', () => {});
  });
});

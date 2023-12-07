import fetch from 'cross-fetch';

describe('user register', () => {
  it('should return a code 201', async () => {
    const res = await fetch('http://backend:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'email@test.fr',
        password: 'Test123!',
        username: 'test',
      }),
    });
    expect(res.status).toEqual(201);
  });
});

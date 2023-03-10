import JWT from '../../functions/utils/jwt';

describe('JWT', () => {
  test('Create JWT', () => {
    const emptyObject = {};
    const jwt = new JWT();
    expect(jwt.header.alg).toBe('HS256');
    expect(jwt.payload).toEqual(emptyObject);
    expect(jwt.signage).toBe('');
    expect(jwt.isExpired).toBe(true);
  });

  test('Create JWT with expiration', () => {
    const jwt = new JWT();
    jwt.expiresIn = 5;
    expect(jwt.header.alg).toBe('HS256');
    expect(jwt.payload).toMatchObject({ exp: expect.any(Number) });
    expect(jwt.signage).toBe('');
    expect(jwt.isExpired).toBe(false);
  });

  test('Sign JWT', () => {
    const jwt = new JWT();
    jwt.sign('This is a secret!');
    expect(jwt.signage).not.toBe('');
    expect(jwt.serialized).toEqual(
      'eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.e30.tk4vOX/KGCSnnbBEM3JohZw2LN1kWP0IPRTo86U2i68',
    );
  });

  test('Sign JWT with expiration', () => {
    const userName = 'testo@testerditest.tst';
    const secret = '*PdAehx46RvX2p7VhCs2_xE6hhc8ChTp8NWKvF-s';
    const jwt = new JWT();
    jwt.payload = { userName };
    jwt.expiresIn = 3600;
    jwt.sign(secret);

    expect(jwt.signage).not.toBe('');
  });
});

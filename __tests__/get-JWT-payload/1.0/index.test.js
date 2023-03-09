import createJWT from '../../../functions/create-JWT/1.0';
import getJWTPayload from '../../../functions/get-JWT-payload/1.0';

describe('Get JWT payload', () => {
  test('It returns payload containing custom variables', async () => {
    const payloadVariables = [
      { key: 'userName', value: 'testo@testerditest.tst' },
      { key: 'something', value: 'else' },
    ];
    const expiresIn = 3600;
    const secret = 'This is a secret!';
    const { JWT } = await createJWT({ payloadVariables, expiresIn, secret });

    const { jwtPayload } = await getJWTPayload({ token: JWT });
    expect(jwtPayload).toMatchObject({
      userName: 'testo@testerditest.tst',
      something: 'else',
      exp: expect.any(Number),
    });
  });

  test('It returns payload containing only expiration when no custom payload is given', async () => {
    const payloadVariables = [];
    const expiresIn = 3600;
    const secret = 'This is a secret!';
    const { JWT } = await createJWT({ payloadVariables, expiresIn, secret });

    const { jwtPayload } = await getJWTPayload({ token: JWT });
    expect(jwtPayload).toMatchObject({ exp: expect.any(Number) });
  });
});

import validateJwt from '../../../functions/validate-jwt/1.0';
import createJwt from '../../../functions/create-jwt/1.0';

describe('Validate JWT', () => {
  test('Token is valid', async () => {
    const payloadVariables = [
      { key: 'userName', value: 'testo@testerditest.tst' },
    ];
    const expiresIn = 3600;
    const secret = 'This is a secret!';
    const { JWT } = await createJwt({ payloadVariables, expiresIn, secret });

    const { isValidJwt } = await validateJwt({ token: JWT, secret });
    expect(isValidJwt).toBe(true);
  });

  test('Token is expired', async () => {
    const payloadVariables = [
      { key: 'userName', value: 'testo@testerditest.tst' },
    ];
    const expiresIn = -3600;
    const secret = 'This is a secret!';
    const { JWT } = await createJwt({ payloadVariables, expiresIn, secret });

    const { isValidJwt } = await validateJwt({ token: JWT, secret });
    expect(isValidJwt).toBe(false);
  });

  test('Secret is incorrect', async () => {
    const payloadVariables = [
      { key: 'userName', value: 'testo@testerditest.tst' },
    ];
    const expiresIn = 3600;
    const incorrectSecret = 'This is an incorrect secret!';
    const { JWT } = await createJwt({
      payloadVariables,
      expiresIn,
      secret: incorrectSecret,
    });
    const correctSecret = 'This should have been the secret!';

    const { isValidJwt } = await validateJwt({
      token: JWT,
      secret: correctSecret,
    });
    expect(isValidJwt).toBe(false);
  });
});

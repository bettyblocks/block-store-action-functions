import validateJWT from '../../../functions/validate-JWT/1.0';
import createJWT from '../../../functions/create-JWT/1.0';

describe('Validate JWT', () => {
  test('Token is valid', async () => {
    const userName = 'testo@testerditest.tst';
    const expiresIn = 3600;
    const secret = 'This is a secret!';
    const { JWT } = await createJWT({ userName, expiresIn, secret });

    const { isValidJwt } = await validateJWT({ token: JWT, secret });
    expect(isValidJwt).toBe(true);
  });

  test('Token is expired', async () => {
    const userName = 'testo@testerditest.tst';
    const expiresIn = 0.000001;
    const secret = 'This is a secret!';
    const { JWT } = await createJWT({ userName, expiresIn, secret });

    const { isValidJwt } = await validateJWT({ token: JWT, secret });
    expect(isValidJwt).toBe(false);
  });

  test('Secret is incorrect', async () => {
    const userName = 'testo@testerditest.tst';
    const expiresIn = 3600;
    const incorrectSecret = 'This is an incorrect secret!';
    const { JWT } = await createJWT({
      userName,
      expiresIn,
      secret: incorrectSecret,
    });
    const correctSecret = 'This should have been the secret!';

    const { isValidJwt } = await validateJWT({
      token: JWT,
      secret: correctSecret,
    });
    expect(isValidJwt).toBe(false);
  });
});

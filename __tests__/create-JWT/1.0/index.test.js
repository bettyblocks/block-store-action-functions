import createJWT from '../../../functions/create-JWT/1.0';

describe('Create JWT from custom input', () => {
  test('It returns a JWT', async () => {
    const userName = 'testo@testerditest.tst';
    const expiresIn = 3600;
    const secret = '*PdAehx46RvX2p7VhCs2_xE6hhc8ChTp8NWKvF-s';

    const response = await createJWT(userName, expiresIn, secret);
    console.log('create test', response);
    const repsonseSplit = response.split('.');
    expect(response).not.toBe('');
    expect(repsonseSplit.length).toBe(3);
  });
});

import createJWT from '../../../functions/create-JWT/1.0';

describe('Create JWT from custom input', () => {
  test('It returns a JWT', async () => {
    const testData = {
      userName: 'testo@testerditest.tst',
      expiresIn: 3600,
      secret: '*PdAehx46RvX2p7VhCs2_xE6hhc8ChTp8NWKvF-s',
    };

    const response = await createJWT(testData);
    console.log('create test', response);
    const repsonseSplit = response.JWT.split('.');
    expect(response.JWT).not.toBe('');
    expect(repsonseSplit.length).toBe(3);
  });
});

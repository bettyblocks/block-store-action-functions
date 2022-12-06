import raiseError from '../../../functions/raise-error/1.0';

describe('Raise error', () => {
  test('It raises an error with the passed error message', async () => {
    await expect(raiseError({ errorMessage: 'You failed' })).rejects.toThrow(
      'You failed',
    );
  });
});

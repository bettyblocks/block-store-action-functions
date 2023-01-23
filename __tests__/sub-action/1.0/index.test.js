import subAction from '../../../functions/sub-action/1.0';

const mapping = {
  name: 'John',
};

describe('Execute sub action', () => {
  test('It executes a sub action', async () => {
    const { result } = await subAction({
      id: '44af8404efab43d8b825529a4a92aa24',
      input: mapping,
    });

    expect(result).toBe('Hello John');
  });
});

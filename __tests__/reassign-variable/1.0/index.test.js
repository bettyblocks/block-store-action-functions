import reassignVariable from '../../../functions/reassign-variable/1.0';

describe('(Re)assign variable', () => {
  test('It returns the given string value', async () => {
    const { result } = await reassignVariable({
      value: 'John Doe',
    });
    expect(result).toBe('John Doe');
  });
});

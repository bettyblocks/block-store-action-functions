import stringify from '../../../functions/stringify/1.0';

describe('stringify', () => {
  test('It returns the given string value', async () => {
    const { result } = await stringify({ value: { test: [1, 2, 3] } });
    expect(JSON.parse(result)).toEqual({ test: [1, 2, 3] });
  });
});

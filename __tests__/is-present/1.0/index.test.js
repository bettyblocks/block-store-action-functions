import isPresent from '../../../functions/is-present/1.0';

describe('Check if record is present', () => {
  test('Check if record is present', async () => {
    const { result } = await isPresent({ anyValue: { data: { id: 1 } } });
    expect(result).toEqual(true);
  });

  test('Check if text is present', async () => {
    const { result } = await isPresent({ anyValue: 'text' });
    expect(result).toEqual(true);
  });

  test('Check if collection is present', async () => {
    const { result } = await isPresent({ anyValue: [1, 2] });
    expect(result).toEqual(true);
  });

  test('Check if empty collection is present', async () => {
    const { result } = await isPresent({ anyValue: [] });
    expect(result).not.toBe(true);
  });
});

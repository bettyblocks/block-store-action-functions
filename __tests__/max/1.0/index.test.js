import max from '../../../functions/max/1.0';

describe('Check if heighest value is returned', () => {
  test('Check if heighest value is returned', async () => {
    const { result } = await max({ array: '[1, 2, 6, 3, 4]' });
    expect(result).toEqual(6);
  });

  test('Check if 0 is returned when array is empty', async () => {
    const { result } = await max({ array: '[]' });
    expect(result).toEqual(0);
  });

  test('Check if heighest value is returned when using min values', async () => {
    const { result } = await max({ array: '[1,4,-6]' });
    expect(result).toEqual(4);
  });
});

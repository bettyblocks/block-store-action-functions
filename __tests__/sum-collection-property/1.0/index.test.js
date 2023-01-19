import sumCollectionProperty from '../../../functions/sum-collection-property/1.0';

const collection = {
  data: [
    {
      id: 1,
      name: 'Sum 1',
      value: '40.00',
    },
    {
      id: 2,
      name: 'Sum 2',
      value: '64.55',
    },
    {
      id: 3,
      name: 'Sum 3',
      value: '80.13',
    },
  ],
};

describe('Sum collection property', () => {
  test('it sums all values from the collection', async () => {
    const { result } = await sumCollectionProperty({
      collection,
      propname: 'value',
    });
    expect(result).toBe(184.68);
  });

  test('it will return NaN if the value is not a number/decimal and cannot be parsed', async () => {
    const { result } = await sumCollectionProperty({
      collection,
      propname: 'name',
    });
    expect(result).toBe(NaN);
  });
});

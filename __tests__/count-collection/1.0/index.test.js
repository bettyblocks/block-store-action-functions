import countCollection from '../../../functions/count-collection/1.0';

describe('Count collection', () => {
  test('It counts the number of records inside a collection', async () => {
    const collection = { data: [{ id: 1 }, { id: 2 }] };

    const { result } = await countCollection({
      collection,
    });

    expect(result).toBe(2);
  });
});

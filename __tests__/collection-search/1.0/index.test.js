import collectionSearch from '../../../functions/collection-search/1.0';

describe('collectionSearch', () => {
  it('should return an array of matching items', async () => {
    const collection = [
      { idx: 1, name: 'John' },
      { idx: 2, name: 'Jane' },
      { idx: 3, name: 'John Doe' },
    ];
    const searchTerm = 'John';
    const propertyName = 'name'; // Add this line to define the propertyName variable

    const result = await collectionSearch({
      query: searchTerm,
      collection: collection,
      property: [{ name: propertyName }],
    });
    console.log(result);

    expect(result.result).toEqual([
      { idx: 1, name: 'John', score: 0.5 },
      { idx: 3, name: 'John Doe', score: 0.3 },
      { idx: 2, name: 'Jane', score: 0.1 },
    ]);
  });
});

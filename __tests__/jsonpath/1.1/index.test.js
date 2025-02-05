import jsonpath from '../../../functions/jsonpath/1.1';

const TEST_DATA = `
{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      }, {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }, {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      }, {
         "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95,
      "sold": true
    }
  }
}
`;

describe('Jsonpath value', () => {
  describe('with input type string and return type', () => {
    test('object', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$..book[(@.length-1)]',
      });
      expect(result).toStrictEqual({
        author: 'J. R. R. Tolkien',
        category: 'fiction',
        isbn: '0-395-19395-8',
        price: 22.99,
        title: 'The Lord of the Rings',
      });
    });

    test('text', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$.store.bicycle.color',
      });
      expect(result).toBe('red');
    });

    test('number', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$.store.bicycle.price',
      });
      expect(result).toBe(19.95);
    });

    test('boolean', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$.store.bicycle.sold',
      });
      expect(result).toBe(true);
    });

    test('list returns the first item', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$.store.book[*].author',
      });
      expect(result).toStrictEqual('Nigel Rees');
    });
  });

  test('with input type object return type text', async () => {
    const { result } = await jsonpath({
      data: JSON.parse(TEST_DATA),
      path: '$.store.bicycle.color',
    });
    expect(result).toBe('red');
  });

  test('with input type integer', async () =>
    expect(async () =>
      jsonpath({
        data: 12345,
        path: '$.store.bicycle.color',
      }),
    ).rejects.toThrow(new Error('obj needs to be an object')));
});

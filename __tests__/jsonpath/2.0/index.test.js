import jsonpath from '../../../functions/jsonpath/2.0';

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
        method: 'value',
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
        method: 'value',
      });
      expect(result).toBe('red');
    });

    test('number', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$.store.bicycle.price',
        method: 'value',
      });
      expect(result).toBe(19.95);
    });

    test('boolean', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$.store.bicycle.sold',
        method: 'value',
      });
      expect(result).toBe(true);
    });

    test('list returns the first item', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$.store.book[*].author',
        method: 'value',
      });
      expect(result).toStrictEqual('Nigel Rees');
    });
  });

  test('with input type object return type text', async () => {
    const { result } = await jsonpath({
      data: JSON.parse(TEST_DATA),
      path: '$.store.bicycle.color',
      method: 'value',
    });
    expect(result).toBe('red');
  });

  test('with input type integer', async () =>
    expect(async () =>
      jsonpath({
        data: 12345,
        path: '$.store.bicycle.color',
        method: 'value',
      }),
    ).rejects.toThrow(/obj needs to be an object/));
});

describe('Jsonpath query', () => {
  describe('with input type string', () => {
    test('The authors of all books in the store', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$.store.book[*].author',
        method: 'query',
      });
      expect(result).toStrictEqual([
        'Nigel Rees',
        'Evelyn Waugh',
        'Herman Melville',
        'J. R. R. Tolkien',
      ]);
    });

    test('The first two books via subscript array slice', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$..book[:2]',
        method: 'query',
      });
      expect(result).toStrictEqual([
        {
          category: 'reference',
          author: 'Nigel Rees',
          title: 'Sayings of the Century',
          price: 8.95,
        },
        {
          category: 'fiction',
          author: 'Evelyn Waugh',
          title: 'Sword of Honour',
          price: 12.99,
        },
      ]);
    });

    test('Filter all books cheaper than 10', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$..book[?(@.price<10)]',
        method: 'query',
      });
      expect(result).toStrictEqual([
        {
          category: 'reference',
          author: 'Nigel Rees',
          title: 'Sayings of the Century',
          price: 8.95,
        },
        {
          category: 'fiction',
          author: 'Herman Melville',
          title: 'Moby Dick',
          isbn: '0-553-21311-3',
          price: 8.99,
        },
      ]);
    });

    test('No results with provided path', async () => {
      const { result } = await jsonpath({
        data: TEST_DATA,
        path: '$..book[?(@.price==0)]',
        method: 'query',
      });
      expect(result).toStrictEqual([]);
    });
  });
});

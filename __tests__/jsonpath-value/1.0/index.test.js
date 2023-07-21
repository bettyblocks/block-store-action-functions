import jsonpath from '../../../functions/jsonpath-value/1.0';

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
  test('object', async () => {
    const { text } = await jsonpath({
      data: TEST_DATA,
      path: '$..book[(@.length-1)]',
      outputType: 'text',
    });
    expect(text).toStrictEqual({
      author: 'J. R. R. Tolkien',
      category: 'fiction',
      isbn: '0-395-19395-8',
      price: 22.99,
      title: 'The Lord of the Rings',
    });
  });

  test('text', async () => {
    const { text } = await jsonpath({
      data: TEST_DATA,
      path: '$.store.bicycle.color',
      outputType: 'text',
    });
    expect(text).toBe('red');
  });

  test('number', async () => {
    const { number } = await jsonpath({
      data: TEST_DATA,
      path: '$.store.bicycle.price',
      outputType: 'number',
    });
    expect(number).toBe(19.95);
  });

  test('boolean', async () => {
    const { boolean } = await jsonpath({
      data: TEST_DATA,
      path: '$.store.bicycle.sold',
      outputType: 'boolean',
    });
    expect(boolean).toBe(true);
  });

  test('list returns the first item', async () => {
    const { text } = await jsonpath({
      data: TEST_DATA,
      path: '$.store.book[*].author',
      outputType: 'text',
    });
    expect(text).toStrictEqual('Nigel Rees');
  });
});

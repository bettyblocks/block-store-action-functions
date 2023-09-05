
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

test('jsonpathValue 1.0', async () => {
  const output = await $app['jsonpathValue 1.0']({
    data: TEST_DATA,
    path: '$.store.book[*].author',
    outputType: 'text',
  });
  assert(output, {"text":"Nigel Rees"});
});

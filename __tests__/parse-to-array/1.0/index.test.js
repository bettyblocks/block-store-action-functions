import parseToArray from '../../../functions/parse-to-array/1.0';

describe('data to JSON', () => {
  test('It parsed the input as JSON', async () => {
    const { as } = await parseToArray({
      data: '[{"test": "data"}]',
      dataType: 'JSON',
    });
    expect(as).toEqual([{ test: 'data' }]);
  });

  test('It parsed the url as JSON', async () => {
    const { as } = await parseToArray({
      data: 'https://example.com/data.json',
      dataType: 'JSON',
    });
    expect(as).toEqual([{ test: 'data' }]);
  });
});

describe('data to CSV', () => {
  test('It parsed the input as CSV', async () => {
    const data = `test,description
data,this is a description`;

    const { as } = await parseToArray({
      data,
      dataType: 'CSV',
    });
    expect(as).toEqual([
      { test: 'data', description: 'this is a description' },
    ]);
  });

  test('It parsed the url as CSV', async () => {
    const { as } = await parseToArray({
      data: 'https://example.com/data.csv',
      dataType: 'CSV',
    });
    expect(as).toEqual([
      { test: 'data', description: 'this is a description' },
    ]);
  });
});

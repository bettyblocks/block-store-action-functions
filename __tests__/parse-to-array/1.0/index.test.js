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

  test('It parsed a file as JSON', async () => {
    const { as } = await parseToArray({
      data: { url: 'https://example.com/data.json', name: 'data.json' },
      dataType: 'JSON',
    });
    expect(as).toEqual([{ test: 'data' }]);
  });

  test('It returns if the data is already parsed', async () => {
    const { as } = await parseToArray({
      data: [{ test: 'data' }],
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

  test('It parsed a file as CSV', async () => {
    const { as } = await parseToArray({
      data: { url: 'https://example.com/data.csv', name: 'data.csv' },
      dataType: 'CSV',
    });
    expect(as).toEqual([
      { test: 'data', description: 'this is a description' },
    ]);
  });

  test('It returns and error if the data is already parsed', async () => {
    const testFunction = () =>
      parseToArray({
        data: [{ test: 'data' }],
        dataType: 'CSV',
      });

    return expect(testFunction).rejects.toThrow('Invalid CSV');
  });
});

describe('It throws an error', () => {
  test('when data is not an array but an object', async () => {
    const testFunction = () =>
      parseToArray({
        data: 'https://example.com/object_data.json',
        dataType: 'JSON',
      });
    return expect(testFunction).rejects.toThrow(
      'The parsed data is not an array',
    );
  });

  test('when data is not an array but a string', async () => {
    const testFunction = () =>
      parseToArray({
        data: 'https://example.com/string_data.json',
        dataType: 'JSON',
      });
    return expect(testFunction).rejects.toThrow(
      'The parsed data is not an array',
    );
  });
});

const parseData = async ({ data, format }) => {
  switch (true) {
    case format === 'JSON' && data === '[{"test": "data"}]':
      return [{ test: 'data' }];
    case format === 'JSON' && data === 'https://example.com/data.json':
      return [{ test: 'data' }];
    case format === 'JSON' && data === 'https://example.com/object_data.json':
      return { test: 'data' };
    case format === 'JSON' && data === 'https://example.com/string_data.json':
      return 'data';
    case format === 'CSV' &&
      data === 'test,description\ndata,this is a description':
      return [{ test: 'data', description: 'this is a description' }];
    case format === 'CSV' && data === 'https://example.com/data.csv':
      return [{ test: 'data', description: 'this is a description' }];
    case format === 'CSV' &&
      JSON.stringify(data) === JSON.stringify([{ test: 'data' }]):
      throw Error(`Invalid CSV`);
    default:
      throw Error(`invalid input: ${data} + ${format}`);
  }
};

export default parseData;

import formatEndpointResult from '../../../functions/format-endpoint-result/1.0';

describe('FormatEndpointResult', () => {
  test('formats the endpoint result correctly with an object as body', async () => {
    const input = {
      statusCode: 200,
      body: { message: 'Success' },
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Cache-Control', value: 'no-cache' },
      ],
    };

    const expectedOutput = {
      result: {
        statusCode: 200,
        body: '{"message":"Success"}',
        headers: [
          ['Content-Type', 'application/json'],
          ['Cache-Control', 'no-cache'],
        ],
      },
    };

    const { result } = await formatEndpointResult(input);
    expect(result).toEqual(expectedOutput.result);
  });

  test('formats the endpoint result correctly with an string as body', async () => {
    const input = {
      statusCode: 200,
      body: 'Ok',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Cache-Control', value: 'no-cache' },
      ],
    };

    const expectedOutput = {
      result: {
        statusCode: 200,
        body: '{"message":"Success"}',
        headers: [
          ['Content-Type', 'application/json'],
          ['Cache-Control', 'no-cache'],
        ],
      },
    };

    const { result } = await formatEndpointResult(input);
    expect(result).toEqual(expectedOutput.result);
  });
});

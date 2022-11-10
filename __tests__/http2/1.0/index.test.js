import https2 from '../../../functions/http2/1.0';

describe('HTTPS2 Step', () => {
  test('Makes a succesfull http call.', async () => {
    expect.assertions(1);

    const request = {
      url: 'http://example.com',
      method: 'get',
      body: '',
      headers: [
        { key: 'Content-Type', value: 'application/json; charset=UTF-8' },
      ],
      protocol: 'http',
      variables: [],
      queryParameters: [{ key: 'name', value: 'foo' }],
    };

    const { as } = await https2(request);

    expect(as).toBe('return text');
  });
  test('Will crash when fetch throws errors.', () => {
    expect.assertions(1);

    const request = {
      url: 'http://error.com',
      method: 'get',
      body: '',
      headers: [
        { key: 'Content-Type', value: 'application/json; charset=UTF-8' },
      ],
      protocol: 'http',
      variables: [],
      queryParameters: [{ key: 'name', value: 'foo' }],
    };
    https2(request).catch(({ message }) => {
      expect(message).toBe('Something went wrong.');
    });
  });
});

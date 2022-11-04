const successResponse = (url) => ({
  ok: true,
  redirected: false,
  size: 1,
  status: 200,
  statusText: 'OK',
  timeout: 100,
  url,
  headers: [{ key: 'Content-Type', value: 'application/json; charset=UTF-8' }],
  blob: {
    type: 'type',
    buffer: [],
  },
  text: () => 'return text',
  json: () => ({ key: 'value' }),
});

const fetch = async (url, _context, _options) => {
  switch (url) {
    case 'http://http://error.com?name=foo':
      throw new Error('Something went wrong.');

    default:
      return successResponse(url);
  }
};

export default fetch;

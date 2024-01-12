const formatEndpointResult = async ({ statusCode, body, headers = [] }) => {
  const formattedHeaders = headers.map((header) => [header.key, header.value]);

  return {
    result: {
      statusCode,
      body: typeof body === 'string' ? body : JSON.stringify(body),
      headers: formattedHeaders,
    },
  };
};

export default formatEndpointResult;

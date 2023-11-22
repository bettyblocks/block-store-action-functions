const generativeAI = async ({ authorization }) => {
  if (authorization.apiKey === 'validApiKey') {
    return Promise.resolve({ result: 'Hello John' });
  }
  return Promise.reject(new Error('Invalid API Key'));
};
export default generativeAI;

const generativeAI = async ({ authorization, agent }) => {
  if (authorization.apiKey === 'validApiKey') {
    switch (agent) {
      case 'text-to-choice':
        return Promise.resolve({ result: 'Google' });
      case 'text-to-text':
        return Promise.resolve({ result: 'Hello John' });
      default: {
        return Promise.reject(new Error('Invalid agent'));
      }
    }
  }
  return Promise.reject(new Error('Invalid API Key'));
};
export default vi.fn(generativeAI);

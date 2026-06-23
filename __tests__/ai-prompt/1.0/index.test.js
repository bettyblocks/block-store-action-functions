import agent from '../../../functions/ai-prompt/1.0';

const validInput = {
  prompt: 'Hello',
  variables: [{ key: 'name', value: 'John' }],
  apiKey: 'validApiKey',
  maxTokens: 100,
  temperature: 50,
  model: 'text-davinci-002',
  parameters: [{ key: 'priority', value: 'high' }],
};

const invalidInput = {
  prompt: 'Hello',
  variables: [{ key: 'name', value: 'John' }],
  apiKey: 'invalidApiKey',
  maxTokens: 100,
  temperature: 50,
  model: 'text-davinci-002',
};

describe('Agent function', () => {
  test('returns the expected result with valid inputs', async () => {
    const { result } = await agent(validInput);
    expect(result).toBe('Hello John');
  });

  test('throws an error with invalid inputs', async () => {
    await expect(agent(invalidInput)).rejects.toThrow('Invalid API Key');
  });
});

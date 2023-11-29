import agent from '../../../functions/ai-summarizer/1.0';

const validConciseInput = {
  prompt: 'Hello',
  variables: [],
  apiKey: 'validApiKey',
  maxTokens: 100,
  temperature: 50,
  model: 'text-davinci-002',
};

const validBulletpointInput = {
  prompt: 'Hello',
  style: 'bulletpoints',
  variables: [],
  apiKey: 'validApiKey',
  maxTokens: 100,
  temperature: 50,
  model: 'text-davinci-002',
};

const invalidInput = {
  prompt: 'Hello',
  variables: [{ key: 'name', value: 'John' }],
  apiKey: 'invalidApiKey',
  maxTokens: 100,
  temperature: 50,
  model: 'text-davinci-002',
};

describe('AI Summarizer', () => {
  test('returns the expected result using the concise summarizer with valid inputs', async () => {
    const { result } = await agent(validConciseInput);
    expect(result).toBe('Hello John');
  });

  test('returns the expected result using the bulletpoints summarizer with valid inputs', async () => {
    const { result } = await agent(validBulletpointInput);
    expect(result).toBe('Hello John');
  });

  test('throws an error with invalid inputs', async () => {
    await expect(agent(invalidInput)).rejects.toThrow('Invalid API Key');
  });
});

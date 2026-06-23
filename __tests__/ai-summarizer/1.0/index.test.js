import summarizer from '../../../functions/ai-summarizer/1.0';

const validConciseInput = {
  textToSummarize: 'Hello',
  style: 'concise',
  apiKey: 'validApiKey',
  maxTokens: 100,
  model: 'text-davinci-002',
  parameters: [{ key: 'priority', value: 'high' }],
};

const validBulletpointInput = {
  textToSummarize: 'Hello',
  style: 'bulletpoints',
  apiKey: 'validApiKey',
  maxTokens: 100,
  model: 'text-davinci-002',
};

const invalidInput = {
  textToSummarize: 'Hello',
  style: 'concise',
  parameters: [],
  apiKey: 'invalidApiKey',
  maxTokens: 100,
  model: 'text-davinci-002',
};

describe('AI Summarizer', () => {
  test('returns the expected result using the concise summarizer with valid inputs', async () => {
    const { result } = await summarizer(validConciseInput);
    expect(result).toBe('Hello John');
  });

  test('returns the expected result using the bulletpoints summarizer with valid inputs', async () => {
    const { result } = await summarizer(validBulletpointInput);
    expect(result).toBe('Hello John');
  });

  test('throws an error with invalid inputs', async () => {
    await expect(summarizer(invalidInput)).rejects.toThrow('Invalid API Key');
  });
});

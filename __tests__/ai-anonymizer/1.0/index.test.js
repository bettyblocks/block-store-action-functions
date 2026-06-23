import anonymizer from '../../../functions/ai-anonymizer/1.0';

const validInput = {
  textToAnonymize: 'Hello John',
  parameters: [{ key: 'name', value: 'John' }],
  apiKey: 'validApiKey',
  maxTokens: 100,
  model: 'text-davinci-002',
};

const invalidInput = {
  textToAnonymize: 'Hello John',
  parameters: [{ key: 'name', value: 'John' }],
  apiKey: 'invalidApiKey',
  maxTokens: 100,
  model: 'text-davinci-002',
};

describe('AI Anonymizer', () => {
  test('returns the expected result with valid inputs', async () => {
    const { result } = await anonymizer(validInput);
    expect(result).toBe('Hello John');
  });

  test('throws an error with invalid inputs', async () => {
    await expect(anonymizer(invalidInput)).rejects.toThrow('Invalid API Key');
  });
});

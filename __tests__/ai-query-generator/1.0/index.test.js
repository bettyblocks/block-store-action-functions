import summarizer from '../../../functions/ai-query-generator/1.0';

describe('ai-query-generator', () => {
  it('should generate a valid regex query with parameters', async () => {
    const query = 'What are rock parrots?';
    const result = await summarizer({
      query,
      style: 'regex',
      apiKey: 'validApiKey',
      maxTokens: 20,
      model: 'gpt-3.5-turbo',
      parameters: [{ key: 'priority', value: 'high' }],
    });
    expect(result.result).toEqual('Hello John');
  });

  it('should generate a query with boolean search', async () => {
    const query = 'What are rock parrots?';
    const result = await summarizer({
      query,
      style: 'boolean',
      apiKey: 'validApiKey',
      maxTokens: 20,
      model: 'gpt-3.5-turbo',
    });
    expect(result.result).toEqual('Hello John');
  });
});

import classifier from '../../../functions/ai-classifier/1.0';

const variables = [
  {
    key: [
      {
        name: 'question',
        kind: 'STRING',
      },
    ],
    value: 'What tool is the best to ask for the current weather?',
  },
];

const paths = jest.fn();

const input = {
  prompt: 'Hello',
  variables,
  apiKey: 'validApiKey',
  maxTokens: 100,
  temperature: 50,
  model: 'text-davinci-002',
};

describe('Classifier function', () => {
  test('generativeAI is called with correct parameters', async () => {
    const mockParams = {
      agent: 'text-to-choice',
      authorization: {
        apiKey: 'testApiKey',
      },
      params: {
        choices: ['choice1', 'choice2'],
        prompt: 'testPrompt',
        model: {
          model: 'testModel',
        },
        variables,
      },
    };

    const { result } = await classifier(input, paths);

    expect(generativeAI).toHaveBeenCalledWith(mockParams);
  });

  test('generativeAI is called once', async () => {
    const mockParams = {
      agent: 'text-to-choice',
      authorization: {
        apiKey: 'testApiKey',
      },
      params: {
        choices: ['choice1', 'choice2'],
        prompt: 'testPrompt',
        model: {
          model: 'testModel',
        },
        variables,
      },
    };

    const { result } = await classifier(input, paths);

    expect(generativeAI).toHaveBeenCalledTimes(1);
  });

  test('classifier returns the result from generativeAI', async () => {
    const mockResult = 'Google';

    const mockParams = {
      agent: 'text-to-choice',
      authorization: {
        apiKey: 'testApiKey',
      },
      params: {
        choices: ['choice1', 'choice2'],
        prompt: 'testPrompt',
        model: {
          model: 'testModel',
        },
        variables,
      },
    };

    const { result } = await classifier(input, paths);

    console.log({ result });

    expect(result).toEqual(mockResult);
  });
});

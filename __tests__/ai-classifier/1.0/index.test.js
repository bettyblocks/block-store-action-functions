import classifier from '../../../functions/ai-classifier/1.0';

const variables = [
  {
    key: 'question',
    value: 'What tool is the best to ask for the current weather?',
  },
];

const input = {
  prompt: 'Hello',
  variables,
  apiKey: 'validApiKey',
  maxTokens: 100,
  temperature: 50,
  model: 'text-davinci-002',
  parameters: [{ key: 'priority', value: 'high' }],
};

const createPaths = (paths) => {
  const resolvedPaths = paths.map(({ label, description, value, steps }) => ({
    label,
    value,
    description,
    steps: steps ?? vi.fn(),
  }));

  Object.defineProperty(resolvedPaths, 'forEach', {
    get() {
      return async (asyncFn) => {
        let halted = false;

        for (const value of this) {
          await asyncFn(value, () => {
            halted = true;
          });
          if (halted) {
            break;
          }
        }
      };
    },
  });

  return resolvedPaths;
};

describe('Classifier function', () => {
  const googleStep = vi.fn();
  const wikipediaStep = vi.fn();

  const expectedParams = {
    agent: 'text-to-choice',
    authorization: {
      apiKey: 'validApiKey',
    },
    params: {
      choices: [
        {
          choice: 'Wikipedia',
          description: undefined,
        },
        {
          choice: 'Google',
          description: undefined,
        },
        {
          choice: 'Language model',
          description: undefined,
        },
        {
          choice: 'Else',
          description:
            'If no other choices match, select Else as the default option.',
        },
      ],
      prompt: 'Hello',
      model: {
        model: 'text-davinci-002',
      },
      variables: {
        question: 'What tool is the best to ask for the current weather?',
      },
      parameters: {
        priority: 'high',
      },
    },
  };

  let output = null;

  beforeAll(async () => {
    const paths = createPaths([
      { label: 'Wikipedia', steps: wikipediaStep },
      { label: 'Google', steps: googleStep },
      { label: 'Language model' },
      { label: 'Else', value: true },
    ]);

    const { result } = await classifier(input, paths);
    output = result;
  });

  test('generativeAI is called with correct parameters', () => {
    expect(generativeAI).toHaveBeenCalledWith(expectedParams);
  });

  test('the correct steps is called/executed', () => {
    expect(googleStep).toBeCalled();
    expect(wikipediaStep).not.toBeCalled();
  });

  test('generativeAI is called once', () => {
    expect(generativeAI).toHaveBeenCalledTimes(1);
  });

  test('classifier returns the result from generativeAI', () => {
    const expectedResult = 'Google';
    expect(output).toEqual(expectedResult);
  });
});

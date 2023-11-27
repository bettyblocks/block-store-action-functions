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
};

const createPaths = (paths) => {
  const resolvedPaths = paths.map(({ label, description, steps }) => ({
    label,
    value: description,
    steps: steps ?? jest.fn(),
  }));

  // similar to ActionsCompiler forEach implementation
  Object.defineProperty(resolvedPaths, 'forEach', {
    get() {
      return async (asyncFn) => {
        let halted = false;
        /* eslint-disable no-restricted-syntax */
        for (const value of this) {
          /* eslint-disable no-await-in-loop */
          /* eslint-disable no-loop-func */
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
  const googleStep = jest.fn();
  const wikipediaStep = jest.fn();

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
          description: undefined,
        },
      ],
      prompt: 'Hello',
      model: {
        model: 'text-davinci-002',
      },
      variables: {
        question: 'What tool is the best to ask for the current weather?',
      },
    },
  };

  let output = null;

  beforeAll(async () => {
    const paths = createPaths([
      { label: 'Wikipedia', steps: wikipediaStep },
      { label: 'Google', steps: googleStep },
      { label: 'Language model' },
      { label: 'Else' },
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

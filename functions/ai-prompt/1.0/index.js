const agent = async ({
  prompt,
  variables,
  apiKey,
  maxTokens,
  temperature,
  model,
  parameters,
}) => {
  const variableMap = variables.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.key]: currentValue.value,
    }),
    {},
  );

  // Convert parameters list to a single object
  const parameterMap = parameters.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.key]: currentValue.value,
    }),
    {},
  );

  const { result } = await generativeAI({
    authorization: {
      apiKey,
    },
    agent: 'text-to-text',
    params: {
      prompt,
      variables: variableMap,
      model: {
        model,
        settings: { maxNewTokens: maxTokens, temperature: temperature / 100 },
      },
      parameters: parameterMap,
    },
  });

  return {
    result,
  };
};

export default agent;

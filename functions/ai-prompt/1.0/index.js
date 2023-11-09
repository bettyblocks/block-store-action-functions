const agent = async ({
  prompt,
  variables,
  apiKey,
  maxTokens,
  temperature,
  model,
}) => {
  const variableMap = variables.reduce(
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
    endpoint: 'text-to-text',

    params: {
      prompt,
      variables: variableMap,
      model: {
        model: model,
        settings: { maxNewTokens: maxTokens, temperature: temperature / 100 },
      },
    },
  });

  return {
    result,
  };
};

export default agent;

const classifier = async ({ prompt, apiKey, model, variables, parameters = [] }, paths) => {
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

  const choices = paths.map(({ label, value }) => ({
    choice: label,
    description:
      value === true
        ? `If no other choices match, select ${label} as the default option.`
        : value,
  }));

  const { result } = await generativeAI({
    agent: 'text-to-choice',
    authorization: {
      apiKey,
    },
    params: {
      choices,
      prompt,
      model: {
        model,
      },
      variables: variableMap,
      parameters: parameterMap,
    },
  });

  await paths.forEach(async ({ label, steps }, halt) => {
    if (label === result) {
      await steps();
      halt();
    }
  });

  return {
    result,
  };
};

export default classifier;

const anonymizer = async ({
  textToAnonymize,
  apiKey,
  maxTokens,
  model,
  parameters = [],
}) => {
  const prompt = `Please review the following document and redact any Personal Identifiable Information (PII) such as names, addresses, phone numbers, email addresses, social security numbers, and any other details that could be used to identify an individual. Ensure the document remains coherent and retains its essential information while ensuring privacy and confidentiality. ${textToAnonymize}`;

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
      model: {
        model,
        settings: { maxNewTokens: maxTokens },
      },
      parameters: parameterMap,
    },
  });

  return {
    result,
  };
};

export default anonymizer;

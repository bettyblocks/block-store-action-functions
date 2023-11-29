const agent = async ({ textToAnonymize, apiKey, maxTokens, model }) => {
  const prompt = `Please review the following document and redact any Personal Identifiable Information (PII) such as names, addresses, phone numbers, email addresses, social security numbers, and any other details that could be used to identify an individual. Ensure the document remains coherent and retains its essential information while ensuring privacy and confidentiality. ${textToAnonymize}`;

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
    },
  });

  return {
    result,
  };
};

export default agent;

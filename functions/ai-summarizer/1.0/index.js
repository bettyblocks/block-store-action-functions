const bulletPointsSummary = (text) =>
  `Could you read the text provided and summarize it into clear, concise bullet points? Focus on extracting the essential points and key details, presenting them in a list format for easy understanding: ${text}`;

const conciseSummary = (text) =>
  `Please read the following text and provide a concise summary, highlighting the main points and key information in a brief and coherent manner: ${text}`;

const summarizer = async ({
  textToSummarize,
  style,
  apiKey,
  maxTokens,
  model,
  parameters = [],
}) => {
  let prompt;

  switch (style) {
    case 'bulletpoints':
      prompt = bulletPointsSummary(textToSummarize);
      break;
    default:
      prompt = conciseSummary(textToSummarize);
  }

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

export default summarizer;

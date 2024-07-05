const regexQuery = (text) =>
  `Please extract and list the most important keywords from the provided text, considering their relevance for a regex-based search to efficiently locate this article within a large database. Return only the search terms separated by a comma (,). Include both the singular and plural version of the terms. 
  
  BEGIN TEXT
  ${text}
  END TEXT`;

const booleanQuery = (text) =>
  `Generate a BM25 compatible boolean query for the following text: ${text}`;

const queryGenerator = async ({ query, style, apiKey, maxTokens, model, parameters = [] }) => {
  let prompt;

  switch (style) {
    case 'boolean':
      prompt = booleanQuery(query);
      break;
    default:
      prompt = regexQuery(query);
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

  const terms = result.split(',').map((term) => term.trim());

  const escapedTerms = terms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  );
  const regexString = escapedTerms.join('|');

  return {
    result: regexString,
  };
};

export default queryGenerator;

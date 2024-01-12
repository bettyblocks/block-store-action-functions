const regexQuery = (text) =>
  `Please extract and list the most important keywords from the provided text, considering their relevance for a regex-based search to efficiently locate this article within a large database. Return only the search terms separated by a comma (,). Include both the singular and plural version of the terms: ${text}`;

const booleanQuery = (text) =>
  `Generate a BM25 compatible boolean query for the following text: ${text}`;

const queryGenerator = async ({ text, style, apiKey, maxTokens, model }) => {
  let prompt;

  switch (style) {
    case 'boolean':
      prompt = booleanQuery(text);
      break;
    default:
      prompt = regexQuery(text);
  }

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

  const terms = result.split(',').map((term) => term.trim());

  const escapedTerms = terms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  );
  const regexString = escapedTerms.join('|');

  // const regex = new RegExp(regexString, 'gi').toString();

  // const { regex } = convertToRegex(result);

  return {
    result: regexString,
  };
};

export default queryGenerator;

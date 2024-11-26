const isFileProperty = (value) =>
  value && typeof value === 'object' && 'url' in value;

const parseDocument = async ({
  document,
  density,
  forceImage,
  decodeHtmlEntities,
}) => {
  const url = isFileProperty(document) ? document?.url : document;

  const { result } = await documentParser({
    document: url,
    parserOptions: { density, forceImage },
  });

  if (decodeHtmlEntities && typeof result === 'string') {
    return { result: result.replaceAll('&nbsp;', ' ') };
  }

  return { result };
};

export default parseDocument;

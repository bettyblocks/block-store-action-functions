const isFileProperty = (value) =>
  value && typeof value === 'object' && 'url' in value;

const parseDocument = async ({ document, density, forceImage }) => {
  const url = isFileProperty(document) ? document?.url : document;

  const { result } = await documentParser({
    document: url,
    parseOptions: { density, forceImage },
  });

  return {
    result,
  };
};

export default parseDocument;

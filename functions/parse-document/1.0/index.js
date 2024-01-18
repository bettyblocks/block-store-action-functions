const parseDocument = async ({ document, density, forceImage }) => {
  const { result } = await documentParser({
    document,
    parseOptions: { density, forceImage },
  });

  return {
    result,
  };
};

export default parseDocument;

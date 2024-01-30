const collectionSearch = async ({
  query,
  collection,
  threshold,
  property: [{ name: propertyName }]
}) => {
  const { result } = await searchCollection({
    query,
    prefilterThreshold: threshold,
    documents: collection?.data ?? [],
    fields: [propertyName]
  });

  return {
    result,
  };
};

export default collectionSearch;

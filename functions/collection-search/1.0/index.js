const collectionSearch = async ({
  query,
  collection,
  property: [{ name: propertyName }],
  chunk,
}) => {
  const { result } = await searchCollection({
    query,
    documents: collection?.data ?? [],
    fields: [propertyName],
    chunk,
  });

  return {
    result,
  };
};

export default collectionSearch;

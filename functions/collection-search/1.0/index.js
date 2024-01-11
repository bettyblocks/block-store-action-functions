const collectionSearch = async ({
  query,
  collection,
  property: [{ name: propertyName }]
}) => {
  const { result } = await searchCollection({
    query,
    documents: collection?.data ?? [],
    fields: [propertyName]
  });

  return {
    result,
  };
};

export default collectionSearch;

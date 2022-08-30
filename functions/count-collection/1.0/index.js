const countCollection = async ({ collection }) => {
  const { data } = collection;
  return {
    result: data.length,
  };
};

export default countCollection;

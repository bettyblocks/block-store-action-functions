const countCollection = async ({ collection: { data } }) => ({
  result: data.length,
});

export default countCollection;

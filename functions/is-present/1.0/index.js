const isPresent = async ({ record: { data } }) => ({
  result: !!data,
});

export default isPresent;

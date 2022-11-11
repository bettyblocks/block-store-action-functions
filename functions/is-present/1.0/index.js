const isPresent = async ({ record }) => ({
  result: record.data !== null,
});

export default isPresent;

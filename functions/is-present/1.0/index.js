const isPresent = async ({ record }) => {
  return {
    result: record.data !== null,
  };
};

export default isPresent;

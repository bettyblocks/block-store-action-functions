const isPresent = async ({ record }) => {
  if (record && !record.data) {
    return {
      as: false,
    };
  }
  const result = record.data ? true : false;

  return {
    as: result,
  };
};

export default isPresent;

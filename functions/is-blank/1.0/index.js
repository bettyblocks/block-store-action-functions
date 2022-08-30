const isBlank = async ({ record }) => {
  if (record && !record.data) {
    return {
      as: true,
    };
  }
  const result = record.data ? false : true;

  return {
    as: result,
  };
};

export default isBlank;

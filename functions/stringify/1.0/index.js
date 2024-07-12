const stringify = async ({ value }) => {
  return {
    result: JSON.stringify(value),
  };
};

export default stringify;

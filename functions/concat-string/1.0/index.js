const concatString = async ({ left, right, separator }) => {
  return {
    result: `${left}${separator}${right}`,
  };
};

export default concatString;

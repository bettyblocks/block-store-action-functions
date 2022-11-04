const concatString = async ({ left, separator, right }) => {
  return {
    result: left.concat(separator, right),
  };
};

export default concatString;

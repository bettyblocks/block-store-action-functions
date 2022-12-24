const concatText = async ({ left, separator, right }) => ({
  result: left.concat(separator ?? '', right),
});

export default concatText;

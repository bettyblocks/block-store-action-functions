const isPresent = async ({ anyValue }) => ({
  result: Array.isArray(anyValue) ? anyValue.length > 0 : !!anyValue,
});

export default isPresent;

const textTransform = async ({
  value,
  downcase,
  upcase,
  capitalize,
  parameterize,
}) => {
  const transformedValue = parameterize
    ? parameterized(value)
    : downcase
    ? value.toLowerCase()
    : upcase
    ? value.toUpperCase()
    : capitalize
    ? capitalized(value)
    : value;

  return { result: transformedValue };
};

const capitalized = (str) =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

const parameterized = (str) =>
  str
    .trim()
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9 -]/g, '');

export default textTransform;

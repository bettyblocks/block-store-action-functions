const textTransform = async ({ value, transformation }) => {
  let result;

  switch (transformation) {
    case 'downcase':
      result = value.toLowerCase();
      break;
    case 'upcase':
      result = value.toUpperCase();
      break;
    case 'capitalize':
      result = capitalized(value);
      break;
    case 'parameterize':
      result = parameterized(value);
      break;
    default:
      result = value;
  }

  return { result };
};

const capitalized = (value) =>
  value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);

const parameterized = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9 -]/g, '');

export default textTransform;

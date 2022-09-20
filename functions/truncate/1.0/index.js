const truncate = async ({ value, size, trailing }) => {
  const trailingText = trailing || '...';
  let truncatedValue = value;
  if (value.length > size) {
    if (size <= 3) {
      truncatedValue = value.slice(0, size - 3) + trailingText;
    } else {
      truncatedValue = value.slice(0, size) + trailingText;
    }
  }

  return { result: truncatedValue };
};

export default truncate;

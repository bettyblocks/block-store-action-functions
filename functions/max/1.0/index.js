const max = async ({ array }) => {
  const json = array !== '[]' ? JSON.parse(array) : [0];
  const maxValue = Math.max(...json);

  return {
    result: maxValue,
  };
};

export default max;

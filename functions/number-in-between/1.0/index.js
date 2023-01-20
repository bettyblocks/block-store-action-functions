const numberInBetween = async ({
  collection,
  leftProperty,
  rightProperty,
  value,
  returnProperty,
}) => {
  const { data } = collection;

  const result = data.filter(
    (item) =>
      parseFloat(item[leftProperty]) <= parseFloat(value) &&
      parseFloat(item[rightProperty]) >= parseFloat(value),
  );

  return {
    recordId: result[0].id,
    name: result[0][returnProperty],
  };
};

export default numberInBetween;

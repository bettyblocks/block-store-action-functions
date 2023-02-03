const numberInBetween = async ({
  collection,
  leftProperty,
  rightProperty,
  value,
  returnProperty,
}) => {
  const { data } = collection;

  if (data.length === 0) {
    throw new Error(
      'The collection is empty. Please make sure there is data present in the collection.',
    );
  }

  const result = data.filter(
    (item) =>
      parseFloat(item[leftProperty]) <= parseFloat(value) &&
      parseFloat(item[rightProperty]) >= parseFloat(value),
  );

  if (result.length === 0) {
    throw new Error('No record found where the value is in between.');
  }

  return {
    recordId: result[0].id,
    name: result[0][returnProperty],
  };
};

export default numberInBetween;

const parseToArray = async ({ data, dataType }) => {
  const parsedData = await parseData({ data, format: dataType });

  if (Array.isArray(parsedData)) {
    return {
      as: parsedData,
    };
  }

  throw Error('The parsed data is not an array');
};

export default parseToArray;

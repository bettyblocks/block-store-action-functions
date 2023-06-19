const parseToArray = async ({ data, dataType }) => {
  const parsedData = await parseData({ data, format: dataType });

  return {
    as: parsedData,
  };
};

export default parseToArray;

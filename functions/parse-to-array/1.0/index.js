const isArray = (data) => typeof data === 'object' && 'length' in data;

const parseToArray = async ({ data, dataType }) => {
  const parsedData = await parseData({ data, format: dataType });

  if (isArray(parsedData)) {
    return {
      as: parsedData,
    };
  }

  throw Error('The parsed data is not an array');
};

export default parseToArray;

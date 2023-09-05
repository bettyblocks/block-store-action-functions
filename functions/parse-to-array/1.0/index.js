const parseToArray = async ({ data, dataType }) => {
  // return data if it is already an array and the datatype is JSON
  if (Array.isArray(data) && dataType === 'JSON') {
    return { as: data };
  }

  let urlOrData = data;

  if (data.url) {
    urlOrData = data.url;
  }

  const parsedData = await parseData({ data: urlOrData, format: dataType });

  if (Array.isArray(parsedData)) {
    return {
      as: parsedData,
    };
  }

  throw Error('The parsed data is not an array');
};

export default parseToArray;

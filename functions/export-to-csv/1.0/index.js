const exportToCSV = async ({
  collectionInput,
  headerMap,
  delimiter,
  model: { name: modelName },
  property: [{ name: propertyName }],
}) => {
  const replacer = (value) => (value === null || value === 'null' ? '' : value);

  const allowedHeaders = headerMap.map((header) => header.key.toLowerCase());

  let csvTextArray = [headerMap.map((header) => header.value).join(delimiter)];

  collectionInput.data.map((dataObject) => {
    let row = '';
    let index = 0;
    for (const [key, value] of Object.entries(dataObject)) {
      if (allowedHeaders.includes(key.toLowerCase())) {
        row += replacer(value);
        if (index < allowedHeaders.length - 1) row += delimiter;
        index++;
      }
    }
    csvTextArray.push(row);
  });

  return {
    reference: await storeFile(modelName, propertyName, {
      contentType: 'text/csv',
      extension: 'csv',
      fileName: 'export',
      fileBuffer: stringToBuffer(csvTextArray.join('\r\n')),
    }),
  };
};

export default exportToCSV;

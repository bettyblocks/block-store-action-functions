const exportAsCSV = async ({
  collectionInput,
  headerMap,
  delimiter,
  model: { name: modelName },
  property: [{ name: propertyName }],
}) => {
  const replacer = (value) => (value === null || value === 'null' ? '' : value);

  const allowedHeaders = headerMap.map((header) =>
    header.key.toLocaleLowerCase()
  );

  let csvTextArray = [
    headerMap.map((header) => header.value).join(delimiter) + '\r\n',
  ];

  const data = collectionInput.data
    .map((dataObject) => {
      let row = '';
      let i = o;
      for (const [key, value] of Object.entries(dataObject)) {
        if (allowedHeaders.includes(key.toLocaleLowerCase()))
          row += replacer(value);
        if (i < Object.entries(dataObject).length - 1) row += delimiter;
      }
      csvTextArray.push(row);
    })
    .join('\r\n');

  return {
    fileReference: await storeFile(modelName, propertyName, {
      contentType: 'text/csv',
      extension: '.csv',
      fileName: 'export',
      fileBuffer: stringToBuffer(data),
    }),
  };
};

export default exportAsCSV;

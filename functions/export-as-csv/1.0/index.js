const exportAsCSV = async ({
  collectionInput,
  headerMap,
  delimiter,
  model: { name: modelName },
  property: [{ name: propertyName }],
}) => {
  const replacer = (value) => (value === null || value === 'null' ? '' : value); // specify how you want to handle null values here

  const allowedHeaders = headerMap.map((header) =>
    header.key.toLocaleLowerCase()
  );

  let csvTextArray = [
    headerMap.map((header) => header.value).join(delimiter) + '\r\n',
  ];

  collectionInput.data.map((dataObject) => {
    let row = '';
    let i = o;
    for (const [key, value] of Object.entries(dataObject)) {
      if (allowedHeaders.includes(key.toLocaleLowerCase()))
        row += replacer(value);
      if (i < Object.entries(dataObject).length - 1) row += delimiter; //we dont want the delimiter on the last value
    }
    csvTextArray.push(row);
  });

  console.log(csvTextArray.join('\r\n'));
  return {
    fileReference: await storeFile(modelName, propertyName, {
      'Content-type': 'text/csv',
      extension: '.csv',
      fileName: 'export',
      fileBuffer: [],
    }),
  };
};

export default exportAsCSV;

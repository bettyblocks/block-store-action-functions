import { ExportToCsv } from 'export-to-csv';
const exportAsCSV = async ({
  collectionInput,
  delimiter,
  model: { name: modelName },
  property: [{ name: propertyName }],
}) => {
  return {
    reference: await storeFile(modelName, propertyName, {
      contentType: 'text/csv',
      extension: 'csv',
      fileName: `${modelName}-export`,
      fileBuffer: stringToBuffer(
        new ExportToCsv({
          fieldSeparator: delimiter,
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true,
          showTitle: false,
          title: 'Diverted Documents Search Export ',
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true,
        }).generateCsv(collectionInput.data, true)
      ),
    }),
  };
};

export default exportAsCSV;

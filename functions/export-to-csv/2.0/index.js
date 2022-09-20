import { ExportToCsv } from 'export-to-csv';
const exportToCSV = async ({
  collectionInput,
  delimiter,
  useBom,
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
          useTextFile: false,
          useBom: useBom,
          useKeysAsHeaders: true,
        }).generateCsv(collectionInput.data, true)
      ),
    }),
  };
};

export default exportToCSV;

import templayed from '../../utils/templayed';

const generatePdf = async ({
  html,
  fileName,
  model: { name: modelName },
  property: [{ name: propertyName }],
  variables = [],
}) => {
  const variableMap = variables.reduce(
    (previousValue, { key, value }) => ({
      ...previousValue,
      [key]: value,
    }),
    {},
  );

  const htmlTemplate = templayed(html)(variableMap);

  const reference = await generatePDF({
    html: htmlTemplate,
    fileName,
    modelName,
    propertyName,
  });

  return {
    reference,
  };
};

export default generatePdf;

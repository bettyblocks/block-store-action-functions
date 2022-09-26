const generateWordDocument = async ({
  templateUrl,
  publicTemplateUrl,
  model,
  property: [{ name: propertyName }],
  fileName,
  variables,
}) => {
  const variableMap = variables.reduce((previousValue, currentValue) => {
    previousValue[currentValue.key] = currentValue.value;
    return previousValue;
  }, {});

  const buffer = await generateDocx(publicTemplateUrl, variableMap, {
    linebreaks: true,
    paragraphLoop: true,
  });

  const reference = await storeFile(model.name, propertyName, {
    contentType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    extension: 'docx',
    fileName,
    fileBuffer: buffer,
  });

  return {
    result: reference,
  };
};

export default generateWordDocument;

import convert from 'xml-js';

const processXmlToJson = async ({ input, outputType }) => {
  const compact = outputType === 'compact';
  const converted = JSON.parse(
    convert.xml2json(input, {
      compact,
    }),
  );

  return {
    output: converted,
  };
};

export default processXmlToJson;

import convert from 'xml-js';

const xmlToJson = async ({ input, outputType }) => {
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

export default xmlToJson;

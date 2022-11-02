import convert from 'xml-js';

const processXmlToJson = async ({ input }) => {
    const converted = JSON.parse(
    convert.xml2json(input, {
      compact: true,
    }),
  );

  return {
    output: converted
  };
};

export default processXmlToJson;

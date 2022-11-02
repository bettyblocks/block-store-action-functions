import convert from 'xml-js';

const processXmlToJson = async ({ request }) => {
    const converted = JSON.parse(
    convert.xml2json(request, {
      compact: true,
    }),
  );

  return {
    response: converted
  };
};

export default processXmlToJson;

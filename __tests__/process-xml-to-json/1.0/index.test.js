import processXmlToJson from '../../../functions/process-xml-to-json/1.0';

describe('JSON to XML', () => {
  test('It parsed the XML input to JSON', async () => {
    const { response } = await processXmlToJson({
      request: "<result><name><firstName>John</firstName><lastName>Doe</lastName></name></result>"
    });

    expect(response).toMatchObject({
      result: {
        name: {
          firstName: {
            "_text": "John"
          },
          lastName: {
            "_text": "Doe"
          }
        }
      }
    });
  });
});

import processXmlToJson from '../../../functions/xml-to-json/1.0';

describe('JSON to XML', () => {
  test('It parsed the XML input to JSON', async () => {
    const { output } = await processXmlToJson({
      input:
        '<result><name><firstName>John</firstName><lastName>Doe</lastName></name></result>',
      outputType: 'compact',
    });

    expect(output).toMatchObject({
      result: {
        name: {
          firstName: {
            _text: 'John',
          },
          lastName: {
            _text: 'Doe',
          },
        },
      },
    });
  });
});

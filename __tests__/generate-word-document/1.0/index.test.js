import generateWordDocument from '../../../functions/generate-word-document/1.0';

describe('Generate word document', () => {
  test('It combines two strings with a hyphen', async () => {
    const { result } = await generateWordDocument({
      model: { name: 'Document' },
      property: [{ name: 'document' }],
      templateUrl: { url: 'https://example.com/word.docx' },
      fileName: 'test',
      variables: [],
    });
    expect(result).toEqual('ExampleFileReference1234');
  });
});

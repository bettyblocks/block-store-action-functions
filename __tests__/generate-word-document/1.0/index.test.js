import generateWordDocument from '../../../functions/generate-word-document/1.0';

describe('GenerateWordDocument', () => {
  test('It generates a Word document', async () => {
    const { result } = await generateWordDocument({
      publicTemplateUrl: 'https://example.com/template.docx',
      fileName: 'test.docx',
      model: { name: 'Product' },
      property: [{ name: 'wordDocument' }],
      variables: [{ key: 'test', value: 'testdocx' }],
    });

    expect(result).toBe('file.storage.reference');
  });
});

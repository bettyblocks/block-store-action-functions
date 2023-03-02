import generatePdf from '../../../functions/generate-pdf/1.0';

describe('GeneratePdf', () => {
  test('It generates a PDF', async () => {
    const { reference } = await generatePdf({
      html: '<h1>{{test}}</h1>',
      fileName: 'test',
      model: { name: 'Product' },
      property: [{ name: 'pdf' }],
      variables: [{ key: 'test', value: 'testpdf' }],
    });

    expect(reference).toBe('my.awesome.reference');
  });
});

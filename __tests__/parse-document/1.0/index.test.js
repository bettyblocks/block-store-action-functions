import parseDocument from '../../../functions/parse-document/1.0';

describe('Parse document', () => {
  test('It returns a string based on a URL', async () => {
    const { result } = await parseDocument({
      document: 'https://www.example.com/document.pdf',
      parseOptions: { density: 300, forceImage: false },
    });

    expect(result).toEqual('Dummy result');
  });

  test('It returns a string based on a file property', async () => {
    const { result } = await parseDocument({
      document: {
        name: 'document.pdf',
        url: 'https://www.example.com/document.pdf',
      },
      parseOptions: { density: 300, forceImage: false },
    });

    expect(result).toEqual('Dummy result');
  });
});

import parseDocument from '../../../functions/parse-document/1.1';

describe('Parse document', () => {
  test('It returns a string based on a URL', async () => {
    const { result } = await parseDocument({
      document: 'https://www.example.com/document.pdf',
      density: 300,
      forceImage: false,
    });

    expect(result).toEqual('Dummy result');
  });

  test('It returns a string based on a file property', async () => {
    const { result } = await parseDocument({
      document: {
        name: 'document.pdf',
        url: 'https://www.example.com/document.pdf',
      },
      density: 300,
      forceImage: false,
    });

    expect(result).toEqual('Dummy result');
  });

  test('It replaces special sequence of characters to spaces if enabled', async () => {
    const { result } = await parseDocument({
      document: {
        name: 'special-document.pdf',
        url: 'https://www.example.com/special-document.pdf',
      },
      density: 300,
      forceImage: false,
      removeSpecialCharacters: true,
    });

    expect(result).toEqual('Dummy result with special characters');
  });

  test("It doesn't replaces special sequence of characters to spaces if disabled", async () => {
    const { result } = await parseDocument({
      document: {
        name: 'special-document.pdf',
        url: 'https://www.example.com/special-document.pdf',
      },
      density: 300,
      forceImage: false,
      removeSpecialCharacters: false,
    });

    expect(result).toEqual('Dummy&nbsp;result with special&nbsp;characters');
  });
});

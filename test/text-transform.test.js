import textTransform from '../functions/text-transform/1.0';

describe('Native text transform', () => {
  test('It downcases a string value', async () => {
    const { result } = await textTransform({
      value: 'DOWNCASE ME',
      transformation: 'downcase',
    });
    expect(result).toBe('downcase me');
  });

  test('It upcases a string value', async () => {
    const { result } = await textTransform({
      value: 'upcase me',
      transformation: 'upcase',
    });
    expect(result).toBe('UPCASE ME');
  });

  test('It capitalizes a string value', async () => {
    const { result } = await textTransform({
      value: 'capitalize me',
      transformation: 'capitalize',
    });
    expect(result).toBe('Capitalize me');
  });

  test('It parameterizes a string value', async () => {
    const { result } = await textTransform({
      value: 'PARAMETERIZE ME',
      transformation: 'parameterize',
    });
    expect(result).toBe('parameterize-me');
  });
});

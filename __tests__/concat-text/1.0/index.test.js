import concatText from '../../../functions/concat-text/1.0';

describe('Concat string', () => {
  test('It combines two strings with a hyphen', async () => {
    const { result } = await concatText({
      left: 'John',
      separator: '-',
      right: 'Doe',
    });
    expect(result).toEqual('John-Doe');
  });

  test('It combines two strings with a space', async () => {
    const { result } = await concatText({
      left: 'John',
      separator: ' ',
      right: 'Doe',
    });
    expect(result).toEqual('John Doe');
  });

  test('It combines two strings with no operator', async () => {
    const { result } = await concatText({
      left: 'John',
      separator: null,
      right: 'Doe',
    });
    expect(result).toEqual('JohnDoe');
  });
});

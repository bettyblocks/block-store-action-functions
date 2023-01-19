import randomHex from '../../../functions/random-hex/1.0';

describe('Random hex generate', () => {
  test('it will return a random generated hex with a 32 length', async () => {
    const { result } = await randomHex({ size: 32 });
    expect(result).toHaveLength(32);
  });

  test('it will return a random generated hex with a 8 length', async () => {
    const { result } = await randomHex({ size: 8 });
    expect(result).toHaveLength(8);
  });
});

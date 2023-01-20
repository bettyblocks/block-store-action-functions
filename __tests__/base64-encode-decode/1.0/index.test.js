import base64EncodeDecode from '../../../functions/base64-encode-decode/1.0';

describe('Base64 Encode/Decode', () => {
  test('it encodes a string to Base64', async () => {
    const { result } = await base64EncodeDecode({
      input: 'BettyBlocks Rulezzz',
      action: 'ENCODE',
    });
    expect(result).toBe('QmV0dHlCbG9ja3MgUnVsZXp6eg==');
  });

  test('it decodes a Base64 string to a string', async () => {
    const { result } = await base64EncodeDecode({
      input: 'QmV0dHlCbG9ja3MgUnVsZXp6eg==',
      action: 'DECODE',
    });
    expect(result).toBe('BettyBlocks Rulezzz');
  });

  test('it fails when the Base64 string is invalid', async () => {
    const { result } = await base64EncodeDecode({
      input: 'hello world!',
      action: 'DECODE',
    });
    expect(result).toBe('Invalid Base64 string detected.');
  });
});

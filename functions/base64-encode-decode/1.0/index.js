import { Base64 } from 'js-base64';

const base64EncodeDecode = async ({ input, action }) => {
  if (action === 'ENCODE') {
    return { result: Base64.encode(input) };
  }
  if (action === 'DECODE' && Base64.isValid(input)) {
    return { result: Base64.decode(input) };
  }
  return { result: 'Invalid Base64 string detected.' };
};

export default base64EncodeDecode;

import { split } from 'sentence-splitter';

const chunk = async ({ input, chunkSize }) => {
  const chunkedInput = split(input);

  const sentences = chunkedInput.filter((c) => c.raw !== ' ').map((c) => c.raw);

  const chunks = [];
  for (let i = 0; i < sentences.length; i += chunkSize) {
    chunks.push(sentences.slice(i, i + chunkSize));
  }
  const result = chunks.map((c) => c.join(' '));

  return {
    result,
  };
};

export default chunk;

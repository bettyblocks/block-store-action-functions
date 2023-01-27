const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');

const randomHex = async ({ size }) => ({
  result: genRanHex(size),
});

export default randomHex;

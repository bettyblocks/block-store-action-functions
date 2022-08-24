const createRandomHex = async ({ size }) => {
  return {
    result: genRanHex(size),
  };
};

export default createRandomHex;

const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');

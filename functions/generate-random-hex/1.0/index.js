const generateRandomHex = async ({ size }) => {
  return {
    result: randomHex(size),
  };
};

const randomHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');

export default generateRandomHex;

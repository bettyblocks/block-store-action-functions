/* eslint-disable no-await-in-loop */
const loop = async ({ array }, steps) => {
  for (let index = 0; index < array.length; index += 1) {
    await steps({ iterator: array[index], index });
  }
};

export default loop;

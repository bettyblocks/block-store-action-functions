/* eslint-disable no-await-in-loop */
const loop = async ({ array = [], outputType }, steps) => {
  for (let index = 0; index < array.length; index += 1) {
    await steps({
      [outputType]:
        outputType === 'number'
          ? parseInt(array[index], 10)
          : String(array[index]),
      index,
    });
  }
};

export default loop;

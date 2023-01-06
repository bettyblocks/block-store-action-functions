import loop from '../../../functions/arrayLoop/1.0';

describe('Native array loop', () => {
  test('It loops over a number array and executes child steps', async () => {
    const array = [1, 2, 3, 4, 5];
    const childSteps = jest.fn();
    const outputType = 'number';
    await loop({ array, outputType }, childSteps);

    expect(childSteps).toHaveBeenCalledTimes(array.length);
    expect(childSteps).toHaveBeenLastCalledWith({
      number: array.slice(-1).pop(),
      index: array.length - 1,
    });
  });

  test('It loops over a number array and executes child steps', async () => {
    const array = [1, 2, 3, 4, 5];
    const childSteps = jest.fn();
    const outputType = 'text';
    await loop({ array, outputType }, childSteps);

    expect(childSteps).toHaveBeenCalledTimes(array.length);
    expect(childSteps).toHaveBeenLastCalledWith({
      text: array.slice(-1).pop().toString(),
      index: array.length - 1,
    });
  });

  test('It loops over a text array and executes child steps', async () => {
    const array = ['text 1', 'text 2', 'text 3', 'text 4', 'text 5'];
    const childSteps = jest.fn();
    const outputType = 'text';
    await loop({ array, outputType }, childSteps);

    expect(childSteps).toHaveBeenCalledTimes(array.length);
    expect(childSteps).toHaveBeenLastCalledWith({
      text: array.slice(-1).pop(),
      index: array.length - 1,
    });
  });

  test('It handles empty arrays', async () => {
    const array = [];
    const childSteps = jest.fn();
    const outputType = 'number';

    await loop({ array, outputType }, childSteps);

    expect(childSteps).not.toHaveBeenCalled();
  });
});

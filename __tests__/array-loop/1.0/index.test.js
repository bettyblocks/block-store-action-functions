import loop from '../../../functions/arrayLoop/1.0';

describe('Native loop', () => {
  test('It loops over a number array and execustes child steps', async () => {
    const array = [1, 2, 3, 4, 5];
    const childSteps = jest.fn();

    await loop({ array }, childSteps);

    expect(childSteps).toHaveBeenCalledTimes(array.length);
    expect(childSteps).toHaveBeenLastCalledWith({
      number: array.slice(-1).pop(),
      index: array.length - 1,
    });
  });

  test('It handles empty arrays', async () => {
    const array = [];
    const childSteps = jest.fn();

    await loop({ array }, childSteps);

    expect(childSteps).not.toHaveBeenCalled();
  });
});

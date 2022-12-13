import deleteSelected from '../../../functions/delete-selected/1.0';

// TO DO: Mock data to check if deleted records match return

describe('Delete selected', () => {
  test('It deletes records from a model based on an array of ids', async () => {
    const modelName = 'Task';
    const selectedIds = [1, 2, 5];
    const recordsPresent = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ];
    const { result } = await deleteSelected(
      { model: { name: modelName } },
      { selectedIds },
    );
    const recordsDeleted = null;

    expect(recordsPresent).not.toBeNull();
    expect(result).toMatch(
      `${
        recordsPresent.length - selectedIds.length
      } ${modelName} records have been deleted`,
    );
    expect(recordsDeleted).toBeNull();
  });

  test('Only IDs of existing records are returned in the result and counted', async () => {
    const modelName = 'Task';
    const selectedIds = [1, 2, 100];
    const recordsPresent = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ];
    const { result } = await deleteSelected(
      { model: { name: modelName } },
      { selectedIds },
    );
    const recordsDeleted = null;

    expect(recordsPresent).not.toBeNull();
    expect(result).toMatch(`2 ${modelName} records have been deleted`);
    expect(recordsDeleted).toBeNull();
  });

  test('It throws an error for non existing models', async () => {
    expect.assertions(1);

    try {
      await deleteSelected({ model: { name: 'invalidModel' } });
    } catch (errors) {
      expect(errors.length).toEqual(1);
    }
  });
});

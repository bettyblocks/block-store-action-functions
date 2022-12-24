import deleteMany from '../../../functions/delete-many/1.0';

const modelName = 'Task';

describe('Delete many', () => {
  test('It deletes all records from the given collection', async () => {
    const collectionInput = [{ id: 1 }, { id: 2 }, { id: 5 }];
    const { result } = await deleteMany({
      collection: { data: collectionInput, model: { name: modelName } },
    });
    expect(result).toMatch(`${modelName} records have been deleted`);
  });
});

import deleteAll from '../../../functions/delete-all/1.0';
import { fetchRecord } from '../../../functions/utils';

describe('Native delete all', () => {
  test('It deletes all records from a model', async () => {
    const modelName = 'Task';
    const recordPresent = await fetchRecord(modelName, 201);
    const { result } = await deleteAll({ model: { name: modelName } });
    const recordDeleted = await fetchRecord(modelName, 201);

    expect(recordPresent).not.toBeNull();
    expect(result).toMatch(`All records from ${modelName} have been deleted`);
    expect(recordDeleted).toBeNull();
  });

  test('It throws an error for non existing models', async () => {
    expect.assertions(1);

    try {
      await deleteAll({ model: { name: 'invalidModel' } });
    } catch (errors) {
      expect(errors.length).toEqual(1);
    }
  });
});

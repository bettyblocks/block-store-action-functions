import { describe, it, expect, vi, beforeEach } from 'vitest';
import deleteAll from '../../../functions/delete-all/1.1';

describe('deleteAll (with global gql)', () => {
  const modelName = 'Task';

  beforeEach(() => {
    globalThis.gql = vi.fn();
  });

  it('throws if gql returns errors during getAll', async () => {
    globalThis.gql = vi.fn(async () => ({
      errors: [{ message: 'Something went wrong' }],
    }));

    await expect(
      deleteAll({
        model: { name: 'Task' },
        filter: '',
        filterVariables: [],
      }),
    ).rejects.toEqual([
      {
        message:
          'Something went wrong while deleting all records from Task: undefined',
      },
    ]);
  });

  it('throws if gql returns errors during deleteMany mutation', async () => {
    globalThis.gql = vi.fn(async (query) => {
      if (query.includes('query')) {
        return {
          data: {
            allTask: {
              results: [{ id: 1 }],
              totalCount: 1,
            },
          },
        };
      }

      if (query.includes('mutation')) {
        return {
          errors: [{ message: 'Mutation failed' }],
        };
      }

      return { data: {} };
    });

    await expect(
      deleteAll({
        model: { name: 'Task' },
        filter: '',
        filterVariables: [],
      }),
    ).rejects.toEqual([
      {
        message:
          'Something went wrong while deleting all records from Task: undefined',
      },
    ]);
  });

  it('catches unexpected errors inside deleteAll and formats the error message correctly', async () => {
    globalThis.gql = vi.fn(() => {
      throw new Error('Unexpected internal error');
    });

    await expect(
      deleteAll({
        model: { name: 'Task' },
        filter: '',
        filterVariables: [],
      }),
    ).rejects.toEqual([
      {
        message:
          'Something went wrong while deleting all records from Task: Unexpected internal error',
      },
    ]);
  });

  it('throws error with formatted message if there is an error in getAll or delete mutation', async () => {
    globalThis.gql = vi.fn(async () => {
      throw new Error('Simulated error in getAll or mutation');
    });

    await expect(
      deleteAll({
        model: { name: 'Task' },
        filter: '',
        filterVariables: [],
      }),
    ).rejects.toEqual([
      {
        message:
          'Something went wrong while deleting all records from Task: Simulated error in getAll or mutation',
      },
    ]);
  });

  it('deletes all records from a model', async () => {
    let callCount = 0;

    globalThis.gql.mockImplementation(async (query) => {
      if (query.includes('query')) {
        if (callCount++ === 0) {
          return {
            data: {
              [`all${modelName}`]: {
                totalCount: 2,
                results: [],
              },
            },
          };
        } else {
          return {
            data: {
              [`all${modelName}`]: {
                results: [{ id: 1 }, { id: 2 }],
                totalCount: 2,
              },
            },
          };
        }
      }

      if (query.includes('mutation')) {
        return {
          data: {
            [`deleteMany${modelName}`]: [{ id: 1 }, { id: 2 }],
          },
        };
      }

      return { data: {} };
    });

    const { result } = await deleteAll({
      model: { name: modelName },
      filter: '',
      filterVariables: [
        { key: 'name', value: 'John' },
        { key: 'age', value: 30 },
        { key: 'city', value: 'New York' },
      ],
    });

    expect(result).toMatch(`All records from ${modelName} have been deleted`);

    const deleteCall = globalThis.gql.mock.calls.find(([query]) =>
      query.includes(`deleteMany${modelName}`),
    );

    expect(deleteCall).toBeTruthy();
    expect(deleteCall[1]).toEqual({ input: { ids: [1, 2] } });
  });

  it('does not call deleteMany if no records are found', async () => {
    globalThis.gql.mockImplementation(async (query) => {
      if (query.includes('query')) {
        return {
          data: {
            [`all${modelName}`]: {
              totalCount: 0,
              results: [],
            },
          },
        };
      }

      if (query.includes('mutation')) {
        return {
          data: {
            [`deleteMany${modelName}`]: [],
          },
        };
      }

      return { data: {} };
    });

    const { result } = await deleteAll({
      model: { name: modelName },
      filter: '',
      filterVariables: [],
    });

    expect(result).toMatch(`All records from ${modelName} have been deleted`);

    const deleteCall = globalThis.gql.mock.calls.find(([query]) =>
      query.includes(`deleteMany${modelName}`),
    );

    expect(deleteCall).toBeUndefined();
  });

  it('throws an error for invalid models', async () => {
    expect.assertions(1);

    globalThis.gql.mockImplementation(async () => {
      throw new Error('Model not found');
    });

    try {
      await deleteAll({
        model: { name: 'InvalidModel' },
        filter: '',
        filterVariables: [],
      });
    } catch (errors) {
      expect(errors.length).toEqual(1);
    }
  });
});

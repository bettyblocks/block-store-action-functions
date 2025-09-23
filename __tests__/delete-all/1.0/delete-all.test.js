import { vi, describe, test, expect, beforeEach } from 'vitest';
import deleteAll from '../../../functions/delete-all/1.0';

describe('Delete all', () => {
  beforeEach(() => {
    globalThis.gql = vi.fn();
  });

  test('It throws an error when getAll returns errors (lines 14-15)', async () => {
    expect.assertions(1);

    globalThis.gql = vi.fn((query) => {
      if (query.includes('totalCount')) {
        return {
          errors: [{ message: 'Query error in getAll' }],
        };
      }

      return { data: {} };
    });

    try {
      await deleteAll({ model: { name: 'Task' } });
    } catch (errors) {
      expect(errors).toEqual([
        {
          message:
            'Something went wrong while deleting all records from Task: [object Object]',
        },
      ]);
    }
  });

  test('It deletes all records from a model', async () => {
    globalThis.gql.mockImplementation((query) => {
      if (query.includes('totalCount')) {
        return {
          data: {
            allTask: {
              totalCount: 1,
            },
          },
        };
      }

      if (query.includes('results')) {
        return {
          data: {
            allTask: {
              results: [{ id: 1 }],
            },
          },
        };
      }

      if (query.includes('mutation')) {
        return {
          data: {
            deleteManyTask: [{ id: 1 }],
          },
        };
      }
    });

    const modelName = 'Task';
    const { result } = await deleteAll({ model: { name: modelName } });
    expect(result).toMatch(`All records from ${modelName} have been deleted`);
  });

  test('It throws an error when delete mutation returns errors (lines 38-39)', async () => {
    expect.assertions(1);

    globalThis.gql = vi.fn((query) => {
      if (query.includes('totalCount')) {
        return {
          data: {
            allTask: {
              totalCount: 1,
            },
          },
        };
      }

      if (query.includes('results')) {
        return {
          data: {
            allTask: {
              results: [{ id: 1 }],
            },
          },
        };
      }

      if (query.includes('mutation')) {
        return {
          errors: [{ message: 'Delete mutation failed' }],
        };
      }
    });

    try {
      await deleteAll({ model: { name: 'Task' } });
    } catch (errors) {
      expect(errors).toEqual([
        {
          message:
            'Something went wrong while deleting all records from Task: [object Object]',
        },
      ]);
    }
  });

  test('It throws an error for non existing models', async () => {
    expect.assertions(1);

    globalThis.gql = vi.fn(() => {
      throw new Error('Model not found');
    });

    try {
      await deleteAll({ model: { name: 'invalidModel' } });
    } catch (errors) {
      expect(errors.length).toEqual(1);
    }
  });
});

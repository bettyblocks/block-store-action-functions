import { describe, it, expect, vi, beforeEach } from 'vitest';
import createOrUpdateRecord from '../../../functions/create-or-update-object/1.0'; // adjust the path

globalThis.gql = vi.fn();

const sampleModelName = 'User';
const baseMapping = [
  { key: [{ name: 'username' }], value: 'john_doe' },
  { key: [{ name: 'email' }], value: 'john@example.com' },
];

const createMapping = [
  { key: [{ name: 'username' }], value: 'john_doe_create' },
  { key: [{ name: 'email' }], value: 'john_create@example.com' },
];

const updateMapping = [
  { key: [{ name: 'email' }], value: 'john_updated@example.com' },
];

const recordObject = {
  id: '123',
  username: 'john_old',
  email: 'john_old@example.com',
};

describe('createOrUpdateRecord', () => {
  beforeEach(() => {
    gql.mockReset();
  });

  it('creates a new record correctly', async () => {
    gql.mockResolvedValue({
      data: {
        createUser: { id: '456' },
      },
    });

    const result = await createOrUpdateRecord({
      cuRecord: {
        data: null,
        model: { name: sampleModelName },
      },
      mapping: baseMapping,
      mappingCreate: createMapping,
      mappingUpdate: updateMapping,
    });

    expect(gql).toHaveBeenCalledWith(
      expect.stringContaining('createUser'),
      expect.objectContaining({
        input: {
          username: 'john_doe_create',
          email: 'john_create@example.com',
        },
        validationSets: ['default'],
      }),
    );

    expect(result).toEqual({
      as: {
        id: '456',
        username: 'john_doe_create',
        email: 'john_create@example.com',
      },
    });
  });

  it('updates a record correctly', async () => {
    gql.mockResolvedValue({
      data: {
        updateUser: { id: '123' },
      },
    });

    const result = await createOrUpdateRecord({
      cuRecord: {
        data: recordObject,
        model: { name: sampleModelName },
      },
      mapping: baseMapping,
      mappingCreate: createMapping,
      mappingUpdate: updateMapping,
    });

    expect(gql).toHaveBeenCalledWith(
      expect.stringContaining('updateUser'),
      expect.objectContaining({
        input: {
          username: 'john_doe',
          email: 'john_updated@example.com',
        },
        id: '123',
        validationSets: ['default'],
      }),
    );

    expect(result).toEqual({
      as: {
        id: '123',
        username: 'john_doe',
        email: 'john_updated@example.com',
      },
    });
  });

  it('throws on gql errors', async () => {
    gql.mockResolvedValue({
      errors: ['Something went wrong'],
    });

    await expect(() =>
      createOrUpdateRecord({
        cuRecord: {
          data: null,
          model: { name: sampleModelName },
        },
        mapping: baseMapping,
        mappingCreate: createMapping,
        mappingUpdate: updateMapping,
      }),
    ).rejects.toEqual(['Something went wrong']);
  });

  it('uses "empty" validation set if validates is false', async () => {
    gql.mockResolvedValue({
      data: {
        createUser: { id: '789' },
      },
    });

    await createOrUpdateRecord({
      cuRecord: {
        data: null,
        model: { name: sampleModelName },
      },
      mapping: baseMapping,
      mappingCreate: createMapping,
      mappingUpdate: updateMapping,
      validates: false,
    });

    expect(gql).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        validationSets: ['empty'],
      }),
    );
  });
});

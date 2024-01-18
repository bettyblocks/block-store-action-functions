import createObject from '../../functions/create-object/1.0';

describe('Create object', () => {
  test('It creates an object with the given properties', async () => {
    const { result } = await createObject({
      keyValueMap: [
        { key: 'name', value: 'John Doe' },
        { key: 'age', value: 30 },
      ],
    });

    expect(result).toEqual({ name: 'John Doe', age: 30 });
  });

  test('It creates an empty object when no properties are given', async () => {
    const { result } = await createObject({ keyValueMap: [] });

    expect(result).toEqual({});
  });

  test('It omits the key value pair from the object when there is no key', async () => {
    const { result } = await createObject({
      keyValueMap: [
        { key: null, value: 'John Doe' },
        { key: '', value: 30 },
        { key: 'age', value: 30 },
      ],
    });

    expect(result).toEqual({ age: 30 });
  });
});

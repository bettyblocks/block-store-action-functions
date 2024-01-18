import createObject from '../../functions/create-object/1.0';

describe('Create object', () => {
  test('It creates an object with the given properties', async () => {
    const { as } = await createObject({
      keyValueMap: [
        { key: 'name', value: 'John Doe' },
        { key: 'age', value: 30 },
      ],
    });

    expect(as).toEqual({ name: 'John Doe', age: 30 });
  });
});

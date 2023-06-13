import updateMany from '../../../functions/update-many/1.0';

const mapping = [
  {
    key: [
      {
        name: 'lastName',
        kind: 'STRING',
      },
    ],
    value: 'Doe',
  },
  {
    key: [
      {
        name: 'age',
        kind: 'INTEGER',
      },
    ],
    value: 40,
  },
];

describe('Update many', () => {
  test('It updates the primitive properties of a collection', async () => {
    const { as: result } = await updateMany({
      selectedCollection: {
        data: [{ id: 1 }, { id: 2 }],
        model: { name: 'User' },
      },
      mapping,
    });
    expect(result).toMatchObject([
      { lastName: 'Doe', age: 40 },
      { lastName: 'Doe', age: 40 },
    ]);
  });

  test('It skips updating when data is empty collection', async () => {
    const { as: result } = await updateMany({
      selectedCollection: {
        data: [],
        model: { name: 'User' },
      },
      mapping,
    });
    expect(result).toStrictEqual([]);
  });

  test('It skips updating when data is undefined collection', async () => {
    const { as: result } = await updateMany({
      selectedCollection: {
        model: { name: 'User' },
      },
      mapping,
    });
    expect(result).toStrictEqual([]);
  });

  test('It updates a belongs to relation based on a record variable', async () => {
    const { as: result } = await updateMany({
      selectedCollection: {
        data: [{ id: 1 }, { id: 2 }],
        model: { name: 'User' },
      },
      mapping: [
        ...mapping,
        {
          key: [
            {
              name: 'city',
              kind: 'BELONGS_TO',
            },
          ],
          value: {
            id: 2,
            name: 'London',
          },
        },
      ],
    });
    expect(result).toMatchObject([
      {
        lastName: 'Doe',
        age: 40,
        city: {
          id: 2,
          name: 'London',
        },
      },
      {
        lastName: 'Doe',
        age: 40,
        city: {
          id: 2,
          name: 'London',
        },
      },
    ]);
  });

  test('It updates a belongs to relation based on a number variable', async () => {
    const { as: result } = await updateMany({
      selectedCollection: {
        data: [{ id: 1 }, { id: 2 }],
        model: { name: 'User' },
      },
      mapping: [
        ...mapping,
        {
          key: [
            {
              name: 'city',
              kind: 'BELONGS_TO',
            },
          ],
          value: 2,
        },
      ],
    });
    expect(result).toMatchObject([
      {
        lastName: 'Doe',
        age: 40,
        city: {
          id: 2,
        },
      },
      {
        lastName: 'Doe',
        age: 40,
        city: {
          id: 2,
        },
      },
    ]);
  });

  test('It updates a belongs to relation based on a id that doesnt exist', async () => {
    const { as: result } = await updateMany({
      selectedCollection: {
        data: [{ id: 1 }, { id: 2 }],
        model: { name: 'User' },
      },
      mapping: [
        ...mapping,
        {
          key: [
            {
              name: 'city',
              kind: 'BELONGS_TO',
            },
          ],
          value: 99,
        },
      ],
    });
    expect(result).toMatchObject([
      {
        lastName: 'Doe',
        age: 40,
        city: null,
      },
      {
        lastName: 'Doe',
        age: 40,
        city: null,
      },
    ]);
  });

  test('It updates a has many relation based on a collection variable', async () => {
    const { as: result } = await updateMany({
      selectedCollection: {
        data: [{ id: 1 }, { id: 2 }],
        model: { name: 'User' },
      },
      mapping: [
        ...mapping,
        {
          key: [
            {
              name: 'tasks',
              kind: 'HAS_MANY',
            },
          ],
          value: [
            { id: 1, name: 'Write tests' },
            { id: 2, name: 'Setup pipeline' },
          ],
        },
      ],
    });
    expect(result).toMatchObject([
      {
        lastName: 'Doe',
        age: 40,
        tasks: [
          { id: 1, name: 'Write tests' },
          { id: 2, name: 'Setup pipeline' },
        ],
      },
      {
        lastName: 'Doe',
        age: 40,
        tasks: [
          { id: 1, name: 'Write tests' },
          { id: 2, name: 'Setup pipeline' },
        ],
      },
    ]);
  });

  test('It updates a has and belongs to many relation based on a number array variable', async () => {
    const { as: result } = await updateMany({
      selectedCollection: {
        data: [{ id: 1 }, { id: 2 }],
        model: { name: 'User' },
      },
      mapping: [
        ...mapping,
        {
          key: [
            {
              name: 'tasks',
              kind: 'HAS_AND_BELONGS_TO_MANY',
            },
          ],
          value: [1, 2],
        },
      ],
    });
    expect(result).toMatchObject([
      {
        lastName: 'Doe',
        age: 40,
        tasks: [{ id: 1 }, { id: 2 }],
      },
      {
        lastName: 'Doe',
        age: 40,
        tasks: [{ id: 1 }, { id: 2 }],
      },
    ]);
  });

  test('It updates a has many or habtm relation based on an empty array', async () => {
    const { as: result } = await updateMany({
      selectedCollection: {
        data: [{ id: 1 }, { id: 2 }],
        model: { name: 'User' },
      },
      mapping: [
        ...mapping,
        {
          key: [
            {
              name: 'tasks',
              kind: 'HAS_MANY',
            },
          ],
          value: [],
        },
      ],
    });
    expect(result).toMatchObject([
      {
        lastName: 'Doe',
        age: 40,
        tasks: [],
      },
      {
        lastName: 'Doe',
        age: 40,
        tasks: [],
      },
    ]);
  });

  test('It updates a collection without mapping', async () => {
    const { as: result } = await updateMany({
      selectedCollection: {
        data: [{ id: 1 }, { id: 2 }],
        model: { name: 'User' },
      },
      mapping: [],
    });
    expect(result).toMatchObject([{ id: 1 }, { id: 2 }]);
  });

  test('It throws an error for missing id', async () => {
    try {
      await updateMany({
        selectedCollection: {
          data: [],
          model: { name: 'User' },
        },
        mapping,
      });
    } catch (errors) {
      expect(errors.length).toEqual(1);
    }
  });
});

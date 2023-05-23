import createOrUpdateRecord from '../../../functions/create-or-update-record/1.0';

const mapping = [
  {
    key: [
      {
        name: 'firstName',
        kind: 'STRING',
      },
    ],
    value: 'James',
  },
  {
    key: [
      {
        name: 'lastName',
        kind: 'STRING',
      },
    ],
    value: 'Smith',
  },
  {
    key: [
      {
        name: 'age',
        kind: 'INTEGER',
      },
    ],
    value: 18,
  },
];

describe('createOrUpdateRecord', () => {
  test('It creates a record when there is no match', async () => {
    const { as: result } = await createOrUpdateRecord({
      model: { name: 'User' },
      property: [{ name: 'lastName' }],
      mapping,
    });

    expect(result).toHaveProperty('id');
    expect(result).toMatchObject({
      firstName: 'James',
      lastName: 'Smith',
      age: 18,
    });
  });

  test('It updates a record when there is a match on last name', async () => {
    const { as: result } = await createOrUpdateRecord({
      model: { name: 'User' },
      property: [{ name: 'lastName' }],
      mapping: [
        {
          key: [
            {
              name: 'firstName',
              kind: 'STRING',
            },
          ],
          value: 'Richard',
        },
        {
          key: [
            {
              name: 'lastName',
              kind: 'STRING',
            },
          ],
          value: 'Doe',
        },
      ],
    });

    expect(result).toHaveProperty('id');
    expect(result).toMatchObject({
      id: 1,
      firstName: 'Richard',
      lastName: 'Doe',
    });
  });

  test('It throws an error for invalid input', async () => {
    expect.assertions(1);

    try {
      await createOrUpdateRecord({
        model: { name: 'invalidModel' },
        property: [{ name: 'lastName' }],
        mapping: [],
      });
    } catch (errors) {
      expect(errors.length).toBeGreaterThan(0);
    }
  });
});

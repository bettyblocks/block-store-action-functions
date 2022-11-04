import update from '../../../functions/update-from-json-input/1.0';

const mapping = [
  {
    key: [
      {
        name: 'firstName',
        kind: 'STRING',
      },
    ],
    value: 'name.firstName',
  },
  {
    key: [
      {
        name: 'lastName',
        kind: 'STRING',
      },
    ],
    value: 'name.lastName',
  },
];

describe('Update from JSON input', () => {
  test('It updates the primitive properties of a record with a JSON value', async () => {
    const { as: result } = await update({
      selectedRecord: {
        data: { id: 1 },
        model: { name: 'User' },
      },
      jsonInput: { name: { firstName: "John", lastName: "Doe" } },
      mapping,
    });
    expect(result).toMatchObject({
      firstName: 'John',
      lastName: 'Doe',
    });
  });
});

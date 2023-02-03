import numberInBetween from '../../../functions/number-in-between/1.0';

const collection = {
  data: [
    {
      id: 1,
      name: 'Objective achieved',
      from: '50.00',
      till: '100.00',
    },
    {
      id: 2,
      name: 'Objective not achieved',
      from: '25.00',
      till: '49.99',
    },
    {
      id: 3,
      name: 'Objective significantly failed',
      from: '0.00',
      till: '24.99',
    },
  ],
};

describe('Number in between', () => {
  test('it will return a property value from a collection if the number given is in between two other values 1', async () => {
    const { recordId, name } = await numberInBetween({
      collection,
      leftProperty: 'from',
      rightProperty: 'till',
      value: '37.65',
      returnProperty: 'name',
    });

    expect(recordId).toBe(2);
    expect(name).toBe('Objective not achieved');
  });

  test('it will return a property value from a collection if the number given is in between two other values 2', async () => {
    const { recordId, name } = await numberInBetween({
      collection,
      leftProperty: 'from',
      rightProperty: 'till',
      value: '0',
      returnProperty: 'name',
    });

    expect(recordId).toBe(3);
    expect(name).toBe('Objective significantly failed');
  });

  test('it will return an error when there is no data present', async () => {
    await expect(
      numberInBetween({
        collection: { data: [] },
        leftProperty: 'from',
        rightProperty: 'till',
        value: '0',
        returnProperty: 'name',
      }),
    ).rejects.toThrow(
      'The collection is empty. Please make sure there is data present in the collection.',
    );
  });

  test('it will return an error when there is no result present', async () => {
    await expect(
      numberInBetween({
        collection,
        leftProperty: 'from',
        rightProperty: 'till',
        value: '999',
        returnProperty: 'name',
      }),
    ).rejects.toThrow('No record found where the value is in between.');
  });
});

import trackChanges from '../../../functions/track-changes/1.0';

describe('trackChanges', () => {
  test('returns null when no changes', async () => {
    const { result } = await trackChanges({
      before: { data: { a: '1' } },
      after: { data: { a: '1' } },
    });
    expect(result).toBe(null);
  });

  test('detects added field', async () => {
    const { result } = await trackChanges({
      before: { data: { a: '1' } },
      after: { data: { a: '1', b: '2' } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'b', oldValue: '', newValue: '2' },
    ]);
  });

  test('detects changed checkbox from false to true', async () => {
    const { result } = await trackChanges({
      before: { data: { accepted: false } },
      after: { data: { accepted: true } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'accepted', oldValue: 'false', newValue: 'true' },
    ]);
  });

  test('detects changed checkbox from true to false', async () => {
    const { result } = await trackChanges({
      before: { data: { accepted: true } },
      after: { data: { accepted: false } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'accepted', oldValue: 'true', newValue: 'false' },
    ]);
  });

  test('detects object removed (id only)', async () => {
    const { result } = await trackChanges({
      before: { data: { company: { id: 1 } } },
      after: { data: null },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'company', oldValue: '1', newValue: '' },
    ]);
  });

  test('detects array difference (has many)', async () => {
    const { result } = await trackChanges({
      before: { data: { users: [{ id: 1 }, { id: 2 }] } },
      after: { data: { users: [{ id: 1 }, { id: 3 }] } },
    });
    expect(JSON.parse(result)).toEqual([
      {
        id: 0,
        label: 'users',
        oldValue: '1,2',
        newValue: '1,3',
      },
    ]);
  });

  test('handles special field: insurerName', async () => {
    const { result } = await trackChanges({
      before: { data: { insurerName: 'A' } },
      after: { data: { insurerName: 'B' } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'insurerName', oldValue: 'A', newValue: 'B' },
    ]);
  });

  test('handles missing data in before or after', async () => {
    const { result } = await trackChanges({
      before: {},
      after: { data: { a: 1 } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'a', oldValue: '', newValue: '1' },
    ]);
  });

  test('throws error when something fails', async () => {
    const badInput = {
      before: { data: { x: {} } },
      after: { data: { x: {} } },
    };

    // Inject bad value to crash parseObject
    badInput.before.data.x.toJSON = () => {
      throw new Error('Oops');
    };

    await expect(trackChanges(badInput)).rejects.toThrow('Oops');
  });
});

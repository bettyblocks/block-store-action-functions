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

    badInput.before.data.x.toJSON = () => {
      throw new Error('Oops');
    };

    await expect(trackChanges(badInput)).rejects.toThrow('Oops');
  });

  test('handles empty object in "before"', async () => {
    const { result } = await trackChanges({
      before: {},
      after: { data: { a: '1' } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'a', oldValue: '', newValue: '1' },
    ]);
  });

  test('handles empty object in "after"', async () => {
    const { result } = await trackChanges({
      before: { data: { a: '1' } },
      after: {},
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'a', oldValue: '1', newValue: '' },
    ]);
  });

  test('handles missing properties in before data', async () => {
    const { result } = await trackChanges({
      before: { data: { a: '1' } },
      after: { data: { a: '1', b: '2' } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'b', oldValue: '', newValue: '2' },
    ]);
  });

  test('handles both before and after being empty objects', async () => {
    const { result } = await trackChanges({
      before: { data: {} },
      after: { data: {} },
    });
    expect(result).toBe(null);
  });

  test('handles unchanged special field: insurerName', async () => {
    const { result } = await trackChanges({
      before: { data: { insurerName: 'A' } },
      after: { data: { insurerName: 'A' } },
    });
    expect(result).toBe(
      '[{"id":0,"label":"insurerName","oldValue":"A","newValue":"A"}]',
    );
  });

  test('handles nested objects correctly', async () => {
    const { result } = await trackChanges({
      before: { data: { company: { id: 1, name: 'A' } } },
      after: { data: { company: { id: 1, name: 'A' } } },
    });
    expect(result).toBe(
      '[{"id":0,"label":"company","oldValue":"1","newValue":"1"}]',
    );
  });

  test('handles undefined properties in before or after data', async () => {
    const { result } = await trackChanges({
      before: { data: { a: undefined } },
      after: { data: { a: '1' } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'a', oldValue: '', newValue: '1' },
    ]);
  });

  test('handles null values in before or after data', async () => {
    const { result } = await trackChanges({
      before: { data: { a: null } },
      after: { data: { a: '1' } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'a', oldValue: '', newValue: '1' },
    ]);
  });

  test('handles when before is null or undefined', async () => {
    const { result } = await trackChanges({
      before: null, // or `undefined`
      after: { data: { a: '1' } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'a', oldValue: '', newValue: '1' },
    ]);
  });

  test('handles when after is null or undefined', async () => {
    const { result } = await trackChanges({
      before: { data: { a: '1' } },
      after: null, // or `undefined`
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'a', oldValue: '1', newValue: '' },
    ]);
  });

  test('handles missing or null values in before or after', async () => {
    const { result } = await trackChanges({
      before: { data: { a: '1' } },
      after: { data: { b: '2' } },
    });
    expect(JSON.parse(result)).toEqual([
      { id: 0, label: 'b', oldValue: '', newValue: '2' },
    ]);
  });
});

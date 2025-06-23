import returnAuditLogs from '../../../functions/return-audit-logs/1.0';

describe('returnAuditLogs', () => {
  const sampleData = [
    { label: 'a', oldValue: '1', newValue: '2' },
    { label: 'b', oldValue: '2', newValue: '3' },
    { label: 'c', oldValue: '3', newValue: '4' },
    { label: 'd', oldValue: '4', newValue: '5' },
  ];

  const record = {
    data: {
      logs: JSON.stringify(sampleData),
    },
  };

  test('returns paginated results', async () => {
    const { result } = await returnAuditLogs({
      record,
      property: 'logs',
      skip: 1,
      take: 2,
    });

    expect(result.totalCount).toBe(4);
    expect(result.results).toEqual([
      { label: 'b', oldValue: '2', newValue: '3', id: 0 },
      { label: 'c', oldValue: '3', newValue: '4', id: 1 },
    ]);
  });

  test('returns all results if take exceeds array length', async () => {
    const { result } = await returnAuditLogs({
      record,
      property: 'logs',
      skip: 0,
      take: 10,
    });

    expect(result.totalCount).toBe(4);
    expect(result.results).toHaveLength(4);
    expect(result.results[0].id).toBe(0);
  });

  test('handles empty array', async () => {
    const emptyRecord = {
      data: { logs: JSON.stringify([]) },
    };

    const { result } = await returnAuditLogs({
      record: emptyRecord,
      property: 'logs',
      skip: 0,
      take: 5,
    });

    expect(result.totalCount).toBe(0);
    expect(result.results).toEqual([]);
  });

  test('handles skip beyond array length', async () => {
    const { result } = await returnAuditLogs({
      record,
      property: 'logs',
      skip: 10,
      take: 5,
    });

    expect(result.totalCount).toBe(4);
    expect(result.results).toEqual([]);
  });

  test('handles take = 0', async () => {
    const { result } = await returnAuditLogs({
      record,
      property: 'logs',
      skip: 1,
      take: 0,
    });

    expect(result.totalCount).toBe(4);
    expect(result.results).toEqual([]);
  });

  test('correctly reassigns ids starting from 0 for paginated slice', async () => {
    const { result } = await returnAuditLogs({
      record,
      property: 'logs',
      skip: 2,
      take: 2,
    });

    expect(result.results[0].label).toBe('c');
    expect(result.results[0].id).toBe(0);
    expect(result.results[1].label).toBe('d');
    expect(result.results[1].id).toBe(1);
  });
});

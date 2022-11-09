import dateOffset from '../../functions/date-offset/1.0';

describe('Retrieve offset between dates', () => {
  test('Determine offset in days between 2022-10-11 and 2022-01-01', async () => {
    const firstDate = '2022-10-11';
    const secondDate = '2022-01-01';
    const unit = 'days';
    const { result } = await dateOffset({ firstDate, secondDate, unit });

    expect(firstDate).not.toBeNull();
    expect(secondDate).not.toBeNull();
    expect(unit).not.toBeNull();
    expect(result).toEqual(283);
  });

  test('Determine offset in weeks between 2022-10-11 and 2022-01-01', async () => {
    const firstDate = '2022-10-11';
    const secondDate = '2022-01-01';
    const unit = 'weeks';
    const { result } = await dateOffset({ firstDate, secondDate, unit });

    expect(firstDate).not.toBeNull();
    expect(secondDate).not.toBeNull();
    expect(unit).not.toBeNull();
    expect(result).toEqual(40);
  });

  test('Determine offset in months between 2022-10-11 and 2022-01-01', async () => {
    const firstDate = '2022-10-11';
    const secondDate = '2022-01-01';
    const unit = 'months';
    const { result } = await dateOffset({ firstDate, secondDate, unit });

    expect(firstDate).not.toBeNull();
    expect(secondDate).not.toBeNull();
    expect(unit).not.toBeNull();
    expect(result).toEqual(9);
  });

  test('Determine offset in years between 2025-10-11 and 2022-01-01', async () => {
    const firstDate = '2025-10-11';
    const secondDate = '2022-01-01';
    const unit = 'years';
    const { result } = await dateOffset({ firstDate, secondDate, unit });

    expect(firstDate).not.toBeNull();
    expect(secondDate).not.toBeNull();
    expect(unit).not.toBeNull();
    expect(result).toEqual(3);
  });
});

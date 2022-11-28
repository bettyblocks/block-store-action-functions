import calculateDate from '../../functions/calculate-datetime/1.0';

describe('Calculate DateTime', () => {
  test('Add one day to 2022-01-01', async () => {
    const method = 'add';
    const date = '2022-01-01';
    const years = 0;
    const months = 0;
    const weeks = 0;
    const days = 1;
    const { as } = await calculateDate({
      method,
      date,
      years,
      months,
      weeks,
      days,
    });

    expect(as).toEqual('2022-01-02');
  });

  test('Add one week to 2022-01-01', async () => {
    const method = 'add';
    const date = '2022-01-01';
    const years = 0;
    const months = 0;
    const weeks = 1;
    const days = 0;
    const { as } = await calculateDate({
      method,
      date,
      years,
      months,
      weeks,
      days,
    });

    expect(as).toEqual('2022-01-08');
  });

  test('Add one month to 2022-01-01', async () => {
    const method = 'add';
    const date = '2022-01-01';
    const years = 0;
    const months = 1;
    const weeks = 0;
    const days = 0;
    const { as } = await calculateDate({
      method,
      date,
      years,
      months,
      weeks,
      days,
    });

    expect(as).toEqual('2022-02-01');
  });

  test('Add one year to 2022-01-01', async () => {
    const method = 'add';
    const date = '2022-01-01';
    const years = 1;
    const months = 0;
    const weeks = 0;
    const days = 0;
    const { as } = await calculateDate({
      method,
      date,
      years,
      months,
      weeks,
      days,
    });

    expect(as).toEqual('2023-01-01');
  });

  test('Subtract one day of 2022-01-01', async () => {
    const method = 'subtract';
    const date = '2022-01-01';
    const years = 0;
    const months = 0;
    const weeks = 0;
    const days = 1;
    const { as } = await calculateDate({
      method,
      date,
      years,
      months,
      weeks,
      days,
    });

    expect(as).toEqual('2021-12-31');
  });

  test('Subtract one week of 2022-01-01', async () => {
    const method = 'subtract';
    const date = '2022-01-01';
    const years = 0;
    const months = 0;
    const weeks = 1;
    const days = 0;
    const { as } = await calculateDate({
      method,
      date,
      years,
      months,
      weeks,
      days,
    });

    expect(as).toEqual('2021-12-25');
  });

  test('Subtract one month of 2022-01-01', async () => {
    const method = 'subtract';
    const date = '2022-01-01';
    const years = 0;
    const months = 1;
    const weeks = 0;
    const days = 0;
    const { as } = await calculateDate({
      method,
      date,
      years,
      months,
      weeks,
      days,
    });

    expect(as).toEqual('2021-12-01');
  });

  test('Subtract one year of 2022-01-01', async () => {
    const method = 'subtract';
    const date = '2022-01-01';
    const years = 1;
    const months = 0;
    const weeks = 0;
    const days = 0;
    const { as } = await calculateDate({
      method,
      date,
      years,
      months,
      weeks,
      days,
    });

    expect(as).toEqual('2021-01-01');
  });
});

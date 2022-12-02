import calculateDate from '../../functions/calculate-date/1.0';

const zeroYears = 0;
const oneYear = 1;
const zeroMonths = 0;
const oneMonth = 1;
const zeroWeeks = 0;
const oneWeek = 1;
const zeroDays = 0;
const oneDay = 1;
const add = 'add';
const subtract = 'substract';
const date = '2022-01-01';

describe('Calculate DateTime', () => {
  test('Add one day to 2022-01-01', async () => {
    const { as } = await calculateDate({
      method: add,
      date,
      years: zeroYears,
      months: zeroMonths,
      weeks: zeroWeeks,
      days: oneDay,
    });

    expect(as).toEqual('2022-01-02');
  });

  test('Add one week to 2022-01-01', async () => {
    const { as } = await calculateDate({
      method: add,
      date,
      years: zeroYears,
      months: zeroMonths,
      weeks: oneWeek,
      days: zeroDays,
    });

    expect(as).toEqual('2022-01-08');
  });

  test('Add one month to 2022-01-01', async () => {
    const { as } = await calculateDate({
      method: add,
      date,
      years: zeroYears,
      months: oneMonth,
      weeks: zeroWeeks,
      days: zeroDays,
    });

    expect(as).toEqual('2022-02-01');
  });

  test('Add one year to 2022-01-01', async () => {
    const { as } = await calculateDate({
      method: add,
      date,
      years: oneYear,
      months: zeroMonths,
      weeks: zeroWeeks,
      days: zeroDays,
    });

    expect(as).toEqual('2023-01-01');
  });

  test('Subtract one day of 2022-01-01', async () => {
    const { as } = await calculateDate({
      method: subtract,
      date,
      years: zeroYears,
      months: zeroMonths,
      weeks: zeroWeeks,
      days: oneDay,
    });

    expect(as).toEqual('2021-12-31');
  });

  test('Subtract one week of 2022-01-01', async () => {
    const { as } = await calculateDate({
      method: subtract,
      date,
      years: zeroYears,
      months: zeroMonths,
      weeks: oneWeek,
      days: zeroDays,
    });

    expect(as).toEqual('2021-12-25');
  });

  test('Subtract one month of 2022-01-01', async () => {
    const { as } = await calculateDate({
      method: subtract,
      date,
      years: zeroYears,
      months: oneMonth,
      weeks: zeroWeeks,
      days: zeroDays,
    });

    expect(as).toEqual('2021-12-01');
  });

  test('Subtract one year of 2022-01-01', async () => {
    const { as } = await calculateDate({
      method: subtract,
      date,
      years: oneYear,
      months: zeroMonths,
      weeks: zeroWeeks,
      days: zeroDays,
    });

    expect(as).toEqual('2021-01-01');
  });
});

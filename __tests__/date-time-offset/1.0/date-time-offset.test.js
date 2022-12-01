import { addMinutes } from 'date-fns';
import dateTimeOffset from '../../../functions/date-time-offset/1.0';

describe('Date Time Offset', () => {
  test('return date time for 1 second added to a new javascript date for UTC+1 zone', async () => {
    const currentDate = true;
    const customStartDate = null;
    const offsetType = 'ss';
    const offset = '1';
    const resultType = 'DT';
    const TimeZoneOffset = '60';
    const checkDate = addMinutes(new Date(), parseInt(TimeZoneOffset, 10));
    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });

    const dateDiff = new Date(result) - checkDate;
    expect(dateDiff).toBeLessThan(1000);
    expect(dateDiff).toBeGreaterThan(0);
  });

  test('return 1 second added to a new javascript date for UTC-6 zone', async () => {
    const currentDate = true;
    const customStartDate = null;
    const offsetType = 'ss';
    const offset = '1';
    const resultType = 'DT';
    const TimeZoneOffset = '-360';
    const checkDate = addMinutes(new Date(), parseInt(TimeZoneOffset, 10));
    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });

    const dateDiff = new Date(result) - checkDate;
    expect(dateDiff).toBeLessThan(1000);
    expect(dateDiff).toBeGreaterThan(0);
  });

  test('return time for 1 second added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const currentDate = false;
    const customStartDate = '2022-01-01 00:00:00';
    const offsetType = 'ss';
    const offset = '1';
    const resultType = 'T';
    const TimeZoneOffset = '60';

    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });
    expect(result).toMatch('00:00:01');
  });

  test('return date time for 1 second added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const currentDate = false;
    const customStartDate = '2022-01-01 00:00:00';
    const offsetType = 'ss';
    const offset = '1';
    const resultType = 'DT';
    const TimeZoneOffset = '60';

    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });
    expect(result).toMatch('2022-01-01 00:00:01');
  });

  test('return time for 2 minutes added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const currentDate = false;
    const customStartDate = '2022-01-01 00:00:00';
    const offsetType = 'mm';
    const offset = '2';
    const resultType = 'T';
    const TimeZoneOffset = '60';

    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });
    expect(result).toMatch('00:02:00');
  });

  test('return time for 1 hour added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const currentDate = false;
    const customStartDate = '2022-01-01 00:00:00';
    const offsetType = 'hh';
    const offset = '1';
    const resultType = 'T';
    const TimeZoneOffset = '60';

    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });
    expect(result).toMatch('01:00:00');
  });

  test('return date for 1 day added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const currentDate = false;
    const customStartDate = '2022-01-01 00:00:00';
    const offsetType = 'DD';
    const offset = '1';
    const resultType = 'DT';
    const TimeZoneOffset = '60';

    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });
    expect(result).toMatch('2022-01-02 00:00:00');
  });

  test('return date time for 1 week added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const currentDate = false;
    const customStartDate = '2022-01-01 05:00:00';
    const offsetType = 'WW';
    const offset = '1';
    const resultType = 'D';
    const TimeZoneOffset = '60';

    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });
    expect(result).toMatch('2022-01-08');
  });

  test('return date time for 1 month added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const currentDate = false;
    const customStartDate = '2022-01-01 00:00:00';
    const offsetType = 'MM';
    const offset = '1';
    const resultType = 'DT';
    const TimeZoneOffset = '60';

    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });
    expect(result).toMatch('2022-02-01 00:00:00');
  });

  test('return date time for 1 year added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const currentDate = false;
    const customStartDate = '2022-01-01 00:00:00';
    const offsetType = 'YYYY';
    const offset = '1';
    const resultType = 'DT';
    const TimeZoneOffset = '60';

    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });
    expect(result).toMatch('2023-01-01 00:00:00');
  });

  test('return Invalid offset type', async () => {
    const currentDate = false;
    const customStartDate = '2022-01-01 00:00:00';
    const offsetType = 'YY';
    const offset = '1';
    const resultType = 'DT';
    const TimeZoneOffset = '60';

    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });
    expect(result).toMatch('Invalid offset type');
  });

  test('return Invalid result type', async () => {
    const currentDate = false;
    const customStartDate = '2022-01-01 00:00:00';
    const offsetType = 'MM';
    const offset = '1';
    const resultType = 'AA';
    const TimeZoneOffset = '60';

    const { result } = await dateTimeOffset({
      currentDate,
      customStartDate,
      offsetType,
      offset,
      resultType,
      TimeZoneOffset,
    });
    expect(result).toMatch('Invalid result type');
  });
});

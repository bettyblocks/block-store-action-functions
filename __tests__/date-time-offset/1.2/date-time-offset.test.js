import { addMinutes } from 'date-fns';
import dateTimeOffset from '../../../functions/date-time-offset/1.2';

describe('Date Time Offset', () => {
  test('return date time for 1 second added to a new javascript date for UTC+1 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: true,
      customStartDate: null,
      offsetType: 'ss',
      offset: '1',
      resultType: 'DT',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);

    const dateDiff =
      new Date(result) -
      addMinutes(new Date(), parseInt(testData.timeZoneOffset, 10));
    expect(dateDiff).toBeLessThan(1000);
    expect(dateDiff).toBeGreaterThan(0);
  });

  test('return date time for 1 second added to a new javascript date for UTC-6 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: true,
      customStartDate: null,
      offsetType: 'ss',
      offset: '1',
      resultType: 'DT',
      timeZoneOffset: '-360',
    };
    const checkDate = addMinutes(
      new Date(),
      parseInt(testData.timeZoneOffset, 10),
    );
    const { result } = await dateTimeOffset(testData);
    const dateDiff = new Date(result) - checkDate;
    expect(dateDiff).toBeLessThan(1000);
    expect(dateDiff).toBeGreaterThan(0);
  });

  test('return time for 1 second added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01 00:00:00',
      offsetType: 'ss',
      offset: '1',
      resultType: 'T',
      timeZoneOffset: '60',
    };

    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('00:00:01');
  });

  test('return date time for 1 second added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01 00:00:00',
      offsetType: 'ss',
      offset: '1',
      resultType: 'DT',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('2022-01-01 00:00:01');
  });

  test('return time for 2 minutes added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01 00:00:00',
      offsetType: 'mm',
      offset: '2',
      resultType: 'T',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('00:02:00');
  });

  test('return time for 1 hour added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01 00:00:00',
      offsetType: 'hh',
      offset: '1',
      resultType: 'T',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('01:00:00');
  });

  test('return date for 1 day added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01 00:00:00',
      offsetType: 'DD',
      offset: '1',
      resultType: 'DT',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('2022-01-02 00:00:00');
  });

  test('return date for 1 business day added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const testData = {
      businessDays: true,
      currentDate: false,
      customStartDate: '2022-01-01 00:00:00',
      offsetType: 'DD',
      offset: '1',
      resultType: 'DT',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('2022-01-03 00:00:00');
  });

  test('return date for 1 week added to 2022-01-01 01:00:00 for UTC+1 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01 01:00:00',
      offsetType: 'WW',
      offset: '1',
      resultType: 'D',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('2022-01-08');
  });

  test('return date time for 1 month added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01 00:00:00',
      offsetType: 'MM',
      offset: '1',
      resultType: 'DT',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('2022-02-01 00:00:00');
  });

  test('return date time for 1 year added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01 00:00:00',
      offsetType: 'YYYY',
      offset: '1',
      resultType: 'DT',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('2023-01-01 00:00:00');
  });

  test('return unix timestamp for 1 second added to 2022-01-01 00:00:00 for UTC+1 zone', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01T00:00:00Z',
      offsetType: 'ss',
      offset: '1',
      resultType: 'UT',
      timeZoneOffset: '60',
    };

    const { result } = await dateTimeOffset(testData);
    expect(result).toBe(1640995201);
  });

  test('return invalid offset type', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01 00:00:00',
      offsetType: 'INCORRECT',
      offset: '1',
      resultType: 'DT',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('Incorrect offset type');
  });

  test('return invalid result type', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2022-01-01 00:00:00',
      offsetType: 'MM',
      offset: '1',
      resultType: 'INCORRECT',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('Incorrect formatting type');
  });

  test('return invalid date, based on custom incorrect date', async () => {
    const testData = {
      businessDays: false,
      currentDate: false,
      customStartDate: '2023-31-31 00:00:00',
      offsetType: 'MM',
      offset: '1',
      resultType: 'D',
      timeZoneOffset: '60',
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('Invalid Date');
  });

  test('return invalid date, based on NO data', async () => {
    const testData = {
      businessDays: false,
      currentDate: null,
      customStartDate: null,
      offsetType: null,
      offset: null,
      resultType: null,
      timeZoneOffset: null,
    };
    const { result } = await dateTimeOffset(testData);
    expect(result).toMatch('Invalid Date');
  });
});

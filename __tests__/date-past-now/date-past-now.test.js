/* eslint-disable no-new-func */
import moment from 'moment';
import dateExpired from '../../functions/date-past-now/1.0';

describe('Check if a date(time) input is past the current date(time)', () => {
  test('Check if yesterday is before the current date(time)', async () => {
    const dateTime = moment().subtract(1, 'days');
    const timeZone = 'Europe/Amsterdam';
    const { result } = await dateExpired(
      {
        timeZone,
        dateTime,
      },
      new Function(),
    );

    expect(result).not.toBeNull();
    expect(result).toEqual(true);
  });

  test('Check if tomorrow is after the current date(time)', async () => {
    const dateTime = moment().add(1, 'days');
    const timeZone = 'Europe/Amsterdam';
    const { result } = await dateExpired(
      {
        timeZone,
        dateTime,
      },
      new Function(),
    );

    expect(result).not.toBeNull();
    expect(result).toEqual(false);
  });
});

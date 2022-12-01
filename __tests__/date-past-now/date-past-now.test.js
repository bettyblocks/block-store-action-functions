/* eslint-disable no-new-func */
import dateExpired from '../../functions/date-past-now/1.0';

describe('Check if a date(time) input is past the current date(time)', () => {
  test('Check if 31-12-2021 is past 01-01-2022', async () => {
    const dateTime = '31-12-2021';
    const timeZone = 'Europe/Amsterdam';
    const { as } = await dateExpired(
      {
        timeZone,
        dateTime,
      },
      new Function(),
    );

    expect(as).not.toBeNull();
    expect(as).toEqual(true);
  });

  test('Check if 02-01-2022 is past 01-01-2022', async () => {
    const dateTime = '02-01-2022';
    const timeZone = 'Europe/Amsterdam';
    const { as } = await dateExpired(
      {
        timeZone,
        dateTime,
      },
      new Function(),
    );

    expect(as).not.toBeNull();
    expect(as).toEqual(true);
  });

  test('Check if kejsgs is past 01-01-2022', async () => {
    const dateTime = 'kejsgs';
    const timeZone = 'Europe/Amsterdam';

    await expect(
      dateExpired(
        {
          timeZone,
          dateTime,
        },
        new Function(),
      ),
    ).rejects.toThrow('Date input is invalid');
  });
});

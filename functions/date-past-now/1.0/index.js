import moment from 'moment-timezone';

const datePastNow = async ({ timeZone, dateTime }, steps) => {
  if (!moment(dateTime, 'DD-MM-YYYY', true).isValid()) {
    throw Error('Date input is invalid');
  }

  const now = moment().tz(timeZone);
  const ExpiryDateTime = moment(dateTime, 'DD-MM-YYYY', true).tz(
    timeZone,
    true,
  );

  if (now.isAfter(ExpiryDateTime)) {
    await steps();
    return {
      as: true,
    };
  }
  return {
    as: false,
  };
};

export default datePastNow;

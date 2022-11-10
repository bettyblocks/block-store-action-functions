import moment from 'moment-timezone';
const datePastNow = async ({ timeZone, dateTime }, steps) => {
  const now = moment().tz(timeZone);
  const ExpiryDateTime = moment(dateTime).tz(timeZone, true);

  if (now.isAfter(ExpiryDateTime)) {
    await steps();
    return {
      result: true,
    };
  } else {
    return {
      result: false,
    };
  }
};

export default datePastNow;

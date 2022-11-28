import moment from 'moment';

const calculateDate = async ({ method, date, years, months, weeks, days }) => {
  if (method === 'add') {
    return {
      as: moment(date, 'YYYY-MM-DD')
        .add(years, 'years')
        .add(months, 'months')
        .add(weeks, 'weeks')
        .add(days, 'days')
        .format('YYYY-MM-DD'),
    };
  }

  return {
    as: moment(date, 'YYYY-MM-DD')
      .subtract(years, 'years')
      .subtract(months, 'months')
      .subtract(weeks, 'weeks')
      .subtract(days, 'days')
      .format('YYYY-MM-DD'),
  };
};

export default calculateDate;

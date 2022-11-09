import moment from 'moment';

const dateOffset = async ({ firstDate, secondDate, unit }) => ({
  result: Math.abs(moment(firstDate).diff(moment(secondDate), unit)),
});

export default dateOffset;

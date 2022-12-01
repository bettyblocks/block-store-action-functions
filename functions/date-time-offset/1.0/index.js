import addSeconds from 'date-fns/addSeconds';
import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import { format, parseISO } from 'date-fns';

const calculateDateTimeOffset = (startDate, offset, offsetType, resultType) => {
  let calculatedOffset = 'Invalid Date';
  if (startDate.toString() !== 'Invalid Date') {
    switch (offsetType) {
      case 'ss':
        calculatedOffset = addSeconds(startDate, offset);
        break;
      case 'mm':
        calculatedOffset = addMinutes(startDate, offset);
        break;
      case 'hh':
        calculatedOffset = addHours(startDate, offset);
        break;
      case 'DD':
        calculatedOffset = addDays(startDate, offset);
        break;
      case 'WW':
        calculatedOffset = addWeeks(startDate, offset);
        break;
      case 'MM':
        calculatedOffset = addMonths(startDate, offset);
        break;
      case 'YYYY':
        calculatedOffset = addYears(startDate, offset);
        break;
      default:
        calculatedOffset = 'Invalid offset type';
    }

    if (calculatedOffset !== 'Invalid offset type') {
      switch (resultType) {
        case 'D':
          calculatedOffset = calculatedOffset.toISOString().substring(0, 10);
          break;
        case 'DT':
          calculatedOffset = format(calculatedOffset, 'yyyy-MM-dd HH:mm:ss');
          break;
        case 'T':
          calculatedOffset = format(calculatedOffset, 'HH:mm:ss');
          break;
        default:
          calculatedOffset = 'Invalid result type';
      }
    }
  }
  return calculatedOffset;
};

const dateTimeOffset = async ({
  currentDate,
  customStartDate,
  offsetType,
  offset,
  resultType,
  TimeZoneOffset,
}) => {
  const startDate = currentDate
    ? // eslint-disable-next-line radix
      addMinutes(new Date(), parseInt(TimeZoneOffset))
    : parseISO(customStartDate);

  const offsetResult = calculateDateTimeOffset(
    startDate,
    offset,
    offsetType,
    resultType,
  );

  return {
    result: offsetResult,
  };
};

export default dateTimeOffset;

import {
  addSeconds,
  addHours,
  addMinutes,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  format,
  parseISO,
  isValid,
} from 'date-fns';

const calculateDateTimeOffset = (startDate, offsetString, offsetType) => {
  const offset = parseInt(offsetString);
  switch (offsetType) {
    case 'ss':
      return addSeconds(startDate, offset);
    case 'mm':
      return addMinutes(startDate, offset);
    case 'hh':
      return addHours(startDate, offset);
    case 'DD':
      return addDays(startDate, offset);
    case 'WW':
      return addWeeks(startDate, offset);
    case 'MM':
      return addMonths(startDate, offset);
    case 'YYYY':
      return addYears(startDate, offset);
    default:
      return 'Incorrect offset type';
  }
};

const formatDate = (resultType, calculatedOffset) => {
  switch (resultType) {
    case 'D':
      return calculatedOffset.toISOString().substring(0, 10);
    case 'DT':
      return format(calculatedOffset, 'yyyy-MM-dd HH:mm:ss');
    case 'T':
      return format(calculatedOffset, 'HH:mm:ss');
    default:
      return 'Incorrect formatting type';
  }
};

const dateTimeOffset = async ({
  currentDate,
  customStartDate,
  offsetType,
  offset,
  resultType,
  timeZoneOffset,
}) => {
  const startDate = currentDate
    ? // eslint-disable-next-line radix
      addMinutes(new Date(), parseInt(timeZoneOffset))
    : parseISO(customStartDate ?? "");

  if (!isValid(startDate)) {
    return {
      result: 'Invalid Date',
    };
  }
  const offsetResult = calculateDateTimeOffset(startDate, offset, offsetType);
  if (!isValid(offsetResult)) {
    return {
      result: offsetResult,
    };
  }
  const returnDate = formatDate(resultType, offsetResult);
  return {
    result: returnDate,
  };
};

export default dateTimeOffset;

import { addDays, format } from 'date-fns';

const datePreset = async ({ preset }) => {
  let date = new Date();
  switch (preset) {
    case 'today':
      break;
    case 'nextWeek':
      date = addDays(date, 7);
      break;
    default:
  }
  return {
    result: format(date, 'yyyy-MM-dd'),
  };
};

export default datePreset;

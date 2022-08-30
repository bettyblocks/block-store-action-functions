const strftime = async ({ date, format }) => {
	let separator = date.includes('-') ? '-' : date.includes('/') ? '/' : ':';
	let splittedFormat = format.split('-');
	let newDate = new Date(date.concat('T00:00:00'));

	const weekday = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let day = newDate.getDate();
	let dayText = weekday[newDate.getDay()];
	let month = newDate.getMonth() + 1;
	let monthText = months[newDate.getMonth()];
	let year = newDate.getYear() - 100 + 2000;

	let newDateString = '';
	const newDateItems = splittedFormat.map((item, index) => {
		if (item === 'dd') {
			newDateString += day;
		}
		if (item === 'dddd') {
			newDateString += dayText;
		}
		if (item === 'mm') {
			newDateString += month;
		}
		if (item === 'mmm') {
			newDateString += monthText;
		}
		if (item === 'yyyy') {
			newDateString += year;
		}
		if (index < splittedFormat.length - 1) {
			newDateString += separator;
		}
	});

	return {
		result: newDateString,
	};
};

export default strftime;

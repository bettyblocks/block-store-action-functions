const today = async () => {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0');
	let yyyy = today.getFullYear();
	let result = `${mm}/${dd}/${yyyy}`;

	return {
		result: result,
	};
};

export default today;

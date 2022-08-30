const max = async ({ array }) => {
	let json = JSON.parse(array);
	let max = Math.max(...json);

	return {
		result: max.toString(),
	};
};

export default max;

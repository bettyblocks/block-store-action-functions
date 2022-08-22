const min = async ({ array }) => {
	let json = JSON.parse(array);
	let min = Math.min(...json);

	return {
		result: min.toString(),
	};
};

export default min;

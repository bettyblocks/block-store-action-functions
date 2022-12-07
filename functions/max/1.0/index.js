const max = async ({ array }) => {
	const json = array !== '[]' ? JSON.parse(array) : [0];
	const max = Math.max(...json);

	return {
		result: max,
	};
};

export default max;

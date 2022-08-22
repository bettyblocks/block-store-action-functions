const slice = async ({ array, start, length }) => {
	let json = JSON.parse(array);
	let end = start + length;
	let result = json.slice(start, end);

	return {
		result: result.toString(),
	};
};

export default slice;

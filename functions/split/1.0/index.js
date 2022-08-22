const split = async ({ string, separator }) => {
	let newString = string.split(separator);
	return {
		result: newString,
	};
};

export default split;

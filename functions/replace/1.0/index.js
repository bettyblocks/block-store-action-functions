const replace = async ({ original, whatToReplace, replaceWithWhat }) => {
	let newString = original.replace(whatToReplace, replaceWithWhat);
	return {
		result: newString,
	};
};

export default replace;

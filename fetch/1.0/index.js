const fetch = async ({ response, key }) => {
	let obj = JSON.parse(response);
	let fetchedItem = obj[key];

	return {
		result: fetchedItem,
	};
};

export default fetch;

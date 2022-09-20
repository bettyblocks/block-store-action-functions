import { ExportToCsv } from 'export-to-csv';

const fetchData = async (take, skip, modelExport, properties, playground) => {
	const url = playground;

	const modelNameExport = `all${modelExport}`;
	let query = `
			query {
				${modelNameExport}(skip: ${skip}, take: ${take}){
					results{
						${properties}
					}
					totalCount
				}
			}
		`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: query,
		}),
	});

	const results = await response.json();
	const replacedResults = results.data[modelNameExport].results.map((d) =>
		Object.keys(d)
			.map((k) => ({ [k]: d[k] || '' }))
			.reduce((kd1, kd2) => ({ ...kd1, ...kd2 }))
	);

	return {
		response: replacedResults,
		totalCount: results.data[modelNameExport].totalCount,
	};
};

const customExportFunction = async ({
	delimiter,
	useBom,
	model: { name: modelName },
	modelExport: { name: modelNameExport },
	property: [{ name: propertyName }],
	exportProperties,
	playGroundUrl,
}) => {
	let skip = 0;
	let take = 200;

	let responseBuilder = [];
	const fetchResults = await fetchData(
		take,
		skip,
		modelName,
		modelNameExport,
		exportProperties,
		playGroundUrl
	);
	responseBuilder = [...responseBuilder, ...fetchResults.response];
	const totalCount = fetchResults.totalCount;
	if (totalCount > take) {
		for (let index = skip; index < totalCount; index += take) {
			const fetchedResults2 = await fetchData(
				take,
				index,
				modelName,
				modelNameExport,
				exportProperties,
				playGroundUrl
			);
			responseBuilder = [...responseBuilder, ...fetchedResults2.response];
		}
	}
	return {
		reference: await storeFile(modelName, propertyName, {
			contentType: 'text/csv',
			extension: 'csv',
			fileName: `${modelName}-export`,
			fileBuffer: stringToBuffer(
				new ExportToCsv({
					fieldSeparator: delimiter,
					quoteStrings: '"',
					decimalSeparator: '.',
					showLabels: true,
					showTitle: false,
					useTextFile: false,
					useBom: useBom,
					useKeysAsHeaders: true,
				}).generateCsv(responseBuilder, true)
			),
		}),
	};
};

export default customExportFunction;

const getAllRecords = async (gqlString, skip, take, results) => {
  const gqlResponse = await gql(gqlString, { skip: skip, take: take });
  const gqlQueryObject = Object.values(gqlResponse)[0];
  const tmpResults = Object.values(gqlQueryObject)[0];

  skip += take;
  if (tmpResults.results.length) {
    const newResults = [...results, ...tmpResults.results];
    results = newResults;
    if (skip <= tmpResults.totalCount) {
      results = await getAllRecords(gqlString, skip, take, results);
    }
  }
  return results;
};

const deleteAllRecordsForModel = async ({ model: { name: modelName } }) => {
  const getIdsQuery = `{
    all${modelName}(skip: $skip, take: $take) {
    results {
      id
    }, 
    totalCount
    }
}`;

  const existingRecords = await getAllRecords(getIdsQuery, 0, 200, []);
  const idsToDelete = existingRecords.map((record) => record.id);
  if (idsToDelete.length > 0) {
    const deleteQuery = `mutation {
    deleteMany${modelName} (input: { ids: [${idsToDelete.join()}] }) { 
        id
        }
    }`;

    try {
      await gql(deleteQuery);
    } catch (error) {
      throw `There has been an error executing the provided GraphQL query: ${error}`;
    }
  }

  return { status: "Ok" };
};

export default deleteAllRecordsForModel;

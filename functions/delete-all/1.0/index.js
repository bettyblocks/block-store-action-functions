const getAll = async (modelName, queryBody) => {
  const queryName = `all${modelName}`;
  const getAllQuery = `
    query($take: Int!) {
      ${queryName}(take: $take) {
        ${queryBody}
      }
    }
  `;

  const { data, errors } = await gql(getAllQuery, { take: 200 });
  if (errors) {
    throw errors;
  }

  const {
    [queryName]: { results, totalCount },
  } = data;

  return { results, totalCount };
};

const deleteBatch = async (modelName) => {
  const { results } = await getAll(modelName, 'results { id }');
  const ids = results.map((item) => item.id);
  const deleteMutation = `
    mutation($input: ${modelName}Input) {
      deleteMany${modelName}(input: $input) {
        id
      }
    }
  `;

  if (ids.length) {
    const { errors } = await gql(deleteMutation, { input: { ids } });
    if (errors) {
      throw errors;
    }
  }
};

const deleteAll = async ({ model }) => {
  const { name: modelName } = model;
  try {
    const { totalCount } = await getAll(modelName, 'totalCount');
    const maxRequests = Math.ceil(totalCount / 200);

    // Loop through batches
    for (let index = 0; index < maxRequests; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      await deleteBatch(modelName);
    }
    return {
      result: `All records from ${modelName} have been deleted (${totalCount})`,
    };
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        `Something went wrong while deleting all records from ${modelName}`,
      );
    } else {
      throw error;
    }
  }
};

export default deleteAll;

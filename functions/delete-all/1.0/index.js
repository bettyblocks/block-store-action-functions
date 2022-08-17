const take = 200;

const deleteAll = async ({ model }) => {
  try {
    const { name: modelName } = model;
    const { totalCount } = await getAll(modelName, 'totalCount');
    const maxRequests = Math.ceil(totalCount / take);

    // Loop through batches
    for (let index = 0; index < maxRequests; index += 1) {
      await deleteBatch(modelName, take);
    }
    return { result: `All records from ${modelName} have been deleted` };
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

const deleteBatch = async (modelName) => {
  const { results } = await getAll(modelName, 'results { id }');
  const ids = results.map((item) => item.id);
  const deleteMutation = `
    mutation {
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

const getAll = async (modelName, queryBody) => {
  const queryName = `all${modelName}`;
  const getAll = `
    query {
      ${queryName}(take: $take) {
        ${queryBody}
      }
    }
  `;

  const {
    data: {
      [queryName]: { results, totalCount },
    },
    errors,
  } = await gql(getAll, { take });

  if (errors) {
    throw errors;
  }

  return { results, totalCount };
};

export default deleteAll;

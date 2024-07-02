import templayed from '../../utils/templayed';

const getAll = async (modelName, where, queryBody) => {
  const queryName = `all${modelName}`;
  const getAllQuery = `
    query {
      ${queryName}(where: $where, take: $take) {
        ${queryBody}
      }
    }
  `;

  const { data, errors } = await gql(getAllQuery, { where, take: 200 });

  if (errors) {
    throw errors;
  }

  const {
    [queryName]: { results, totalCount },
  } = data || {};

  return { results, totalCount };
};

const deleteBatch = async (modelName, where) => {
  const { results = [] } = await getAll(modelName, where, 'results { id }');
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

const filterToMap = (filter, variableMap) =>
  // Source: https://stackoverflow.com/questions/9637517/parsing-relaxed-json-without-eval
  JSON.parse(
    `{ ${templayed(filter || '')(variableMap).replace(
      /(['"])?([a-z0-9A-Z_]+)(['"])?:/g,
      '"$2": ',
    )} }`,
  );
const deleteAll = async ({
  model: { name: modelName },
  filter,
  filterVariables = [],
}) => {
  const variableMap = filterVariables.reduce((previousValue, currentValue) => {
    // eslint-disable-next-line no-param-reassign
    previousValue[currentValue.key] = currentValue.value;
    return previousValue;
  }, {});

  const where = filterToMap(filter, variableMap);
  try {
    const { totalCount } = await getAll(modelName, where, 'totalCount');
    const maxRequests = Math.ceil(totalCount / 200);

    // Loop through batches
    for (let index = 0; index < maxRequests; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      await deleteBatch(modelName, where);
    }
    return {
      result: `All records from ${modelName} have been deleted (${totalCount})`,
    };
  } catch (error) {
    const errorMessage = [
      {
        message: `Something went wrong while deleting all records from ${modelName}: ${error.message}`,
      },
    ];
    throw errorMessage;
  }
};

export default deleteAll;

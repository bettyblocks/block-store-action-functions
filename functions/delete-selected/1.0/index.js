/* eslint no-console: ["error", { allow: ["log", "error"] }] */
const deleteSelected = async ({
  model: { name: modelName },
  selectedIds = [],
  logging,
}) => {
  try {
    const mutationName = `deleteMany${modelName}`;
    const mutation = `
          mutation {
            ${mutationName}(input: $input) {
              id
            }
          }
        `;

    const { data, errors } = await gql(mutation, {
      input: { ids: selectedIds },
    });

    if (errors) {
      throw errors;
    }
    if (logging) {
      console.log({ input: selectedIds, result: data });
    }
    const resultLength =
      data &&
      data[`deleteMany${modelName}`] &&
      data[`deleteMany${modelName}`].length;

    return {
      result: `${resultLength} ${modelName} records have been deleted`,
    };
  } catch (error) {
    if (logging) {
      console.error({ error });
    }
    throw error;
  }
};

export default deleteSelected;

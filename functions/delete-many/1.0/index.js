const deleteMany = async ({
  collection: {
    data,
    model: { name: modelName },
  },
}) => {
  try {
    const ids = data.map((item) => item.id);
    const count = ids.length;
    const mutationName = `deleteMany${modelName}`;
    const mutation = `
        mutation {
          ${mutationName}(input: $input) {
            id
          }
        }
      `;

    const { errors } = await gql(mutation, { input: { ids } });

    if (errors) {
      throw errors;
    }

    return {
      result: `${count} ${modelName} records have been deleted`,
    };
  } catch (error) {
    throw error;
  }
};

export default deleteMany;

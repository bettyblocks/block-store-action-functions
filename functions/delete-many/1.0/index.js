const deleteMany = async ({ collection }) => {
  try {
    const {
      data,
      model: { name: modelName },
    } = collection;
    const ids = data.map((item) => item.id);
    const count = ids.length;
    const mutation = `
        mutation {
          deleteMany${modelName}(input: $input) {
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
    if (error instanceof TypeError) {
      throw new Error('One record could not be found');
    } else {
      throw error;
    }
  }
};

export default deleteMany;

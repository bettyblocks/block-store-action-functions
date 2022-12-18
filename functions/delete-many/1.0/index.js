const deleteMany = async ({
  collection: {
    data: deleteRecords,
    model: { name: modelName },
  },
}) => {
  const mutationName = `deleteMany${modelName}`;
  const mutation = `
    mutation($input: ${modelName}Input) {
      ${mutationName}(input: $input) {
        id
      }
    }
  `;

  const ids = deleteRecords.map((item) => item.id);
  const { data, errors } = await gql(mutation, {
    input: { ids },
  });

  if (errors) {
    throw errors;
  }

  return {
    result: `${data[mutationName].length} ${modelName} records have been deleted`,
  };
};

export default deleteMany;

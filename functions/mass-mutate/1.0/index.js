const massMutate = async (_, steps) => {
  await gql.buffer({ steps }, async (mutations) => {
    await Promise.all(
      Object.entries(mutations).map(async ([_mutation, execute]) => execute()),
    );
  });
};

export default massMutate;

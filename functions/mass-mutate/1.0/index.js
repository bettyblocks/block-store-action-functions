const massMutate = async (_, steps) => {
  const resolveMutationGroups = async (promise, mutations) => {
    await promise;
    return Promise.all(
      Object.entries(mutations).map(async ([, execute]) => execute()),
    );
  };

  await gql.buffer({ steps }, async (mutationGroups) => {
    await mutationGroups.reduce(resolveMutationGroups, Promise.resolve());
  });
};

export default massMutate;

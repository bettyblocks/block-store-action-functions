const massMutate = async (_, steps) => {
  await gql.buffer({ steps }, async (mutationGroups) => {
    await mutationGroups.reduce(async (promise, mutations) => {
      await promise;
      return Promise.all(
        Object.entries(mutations).map(async ([mutation, execute]) => {
          return await execute();
        })
      );
    }, Promise.resolve());
  });
};

export default massMutate;

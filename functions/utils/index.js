/* eslint-disable import/prefer-default-export */
export const fetchRecord = async (modelName, id) => {
  const queryName = `one${modelName}`;

  const query = `
    query($where: ${modelName}FilterInput) {
      ${queryName}(where: $where) {
        id
      }
    }
  `;

  const { data } = await gql(query, { where: { id: { eq: id } } });

  const { [queryName]: record } = data;

  return record;
};

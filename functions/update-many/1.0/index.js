import { parseAssignedProperties, fetchRecords } from '../../utils';

const updateMany = async ({
  selectedCollection: {
    data,
    model: { name: modelName },
  },
  mapping,
}) => {
  if (!data || data.length === 0) {
    return {
      as: [],
    };
  }

  const fragment = await parseToGqlFragment({
    propertyMap: mapping,
    modelName,
  });
  const mutationName = `updateMany${modelName}`;
  const assignProperties = parseAssignedProperties(mapping);
  const ids = data.map((item) => item.id);
  const mutation = `
    mutation($input: ${modelName}Input, $where: Many${modelName}FilterInput) {
      ${mutationName}(input: $input, where: $where) {
        id
      }
    }
  `;

  const { errors } = await gql(mutation, {
    input: assignProperties,
    where: { id: { in: ids } },
  });

  if (errors) {
    throw errors;
  }

  const updatedRecords = await fetchRecords(modelName, ids, fragment);

  return {
    as: updatedRecords,
  };
};

export default updateMany;

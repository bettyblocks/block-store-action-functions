import { parseAssignedProperties } from '../../utils/index';

const updateMany = async ({
  selectedCollection: {
    data,
    model: { name: modelName },
  },
  mapping,
}) => {
  try {
    const queryName = `updateMany${modelName}`;
    const assignProperties = parseAssignedProperties(mapping);
    const ids = data.map((item) => item.id);
    const mutation = `
      mutation {
        ${queryName}(input: $input, where: $where) {
          id
        }
      }
    `;

    const {
      data: { [queryName]: updatedData },
      errors,
    } = await gql(mutation, {
      input: assignProperties,
      where: { id: { in: ids } },
    });

    if (errors) {
      throw errors;
    }

    return {
      result: `${
        updatedData.length
      } ${modelName} records have been updated. Here's a list of all updated record ids: ${updatedData
        .map((obj) => obj.id)
        .join(', ')}`,
    };
  } catch (error) {
    throw error;
  }
};

export default updateMany;

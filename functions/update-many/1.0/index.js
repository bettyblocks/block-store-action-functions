import { parseAssignedProperties } from '../../utils/index';

const updateMany = async ({ selectedCollection, mapping }) => {
  try {
    const {
      data,
      model: { name: modelName },
    } = selectedCollection;
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
      result: `${updatedData.length} ${modelName} records have been updated.`,
    };
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('One record could not be found');
    } else {
      throw error;
    }
  }
};

export default updateMany;

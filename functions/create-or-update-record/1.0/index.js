import {
  parseAssignedProperties,
  fetchRecord,
  validatesToValidationSets,
} from '../../utils';

const createOrUpdateRecord = async ({
  model: { name: modelName },
  property: [{ name: propertyName }],
  mapping,
  validates = true,
}) => {
  const fragment = await parseToGqlFragment({
    propertyMap: mapping,
    modelName,
  });

  const assignProperties = parseAssignedProperties(mapping);

  const input = {
    ...assignProperties,
  };

  const mutationName = `upsert${modelName}`;

  const mutation = `
    mutation($input: ${modelName}Input, $uniqueBy: [String], $validationSets: [String]) {
      ${mutationName}(input: $input, uniqueBy: $uniqueBy, validationSets: $validationSets) {
        id
      }
    }
  `;

  const { data, errors } = await gql(mutation, {
    input,
    uniqueBy: [propertyName],
    validationSets: validatesToValidationSets(validates),
  });

  if (errors) {
    throw errors;
  }

  const {
    [mutationName]: { id },
  } = data;
  const createdRecord = await fetchRecord(modelName, id, fragment);

  return {
    as: createdRecord,
  };
};

export default createOrUpdateRecord;

function transformData(input) {
  return input.reduce((acc, { key, value }) => {
    const keyName = key[0]?.name;
    if (keyName) acc[keyName] = value;
    return acc;
  }, {});
}

function mergeAndUpdate(source, target, flipUpdate = false) {
  return Object.keys(source).reduce(
    (acc, key) =>
      key in acc
        ? { ...acc, [key]: flipUpdate ? target[key] : source[key] }
        : acc,
    { ...target },
  );
}

export async function createOrUpdateObject({
  cuRecord: {
    data: recordObject,
    model: { name: modelName },
  },
  mapping,
  mappingCreate,
  mappingUpdate,
  validates = true,
}) {
  const isUpdate = Boolean(recordObject);
  const mutationName = isUpdate ? `update${modelName}` : `create${modelName}`;
  const mutation = `mutation {
  ${mutationName}(input: $input${isUpdate ? ', id: $id' : ''}) {
      id
    }
  }`;

  const formattedInput = transformData(mapping);
  const input = mergeAndUpdate(
    transformData(isUpdate ? mappingUpdate : mappingCreate),
    isUpdate
      ? mergeAndUpdate(recordObject, formattedInput, true)
      : formattedInput,
  );

  const { data, errors } = await gql(mutation, {
    input,
    ...(isUpdate && { id: recordObject.id }),
    validationSets: validates ? ['default'] : ['empty'],
  });
  if (errors) throw errors;
  return {
    as: { ...data[mutationName], ...input },
  };
}

export default createOrUpdateObject;

import { RelationKind } from './constants';

const isRecord = (value) => value && value.id !== undefined;

const belongsToValue = (value) => (isRecord(value) ? value.id : value);

const hasManyOrHasAndBelongsToManyValue = (value) => {
  const recordIds = value.map((val) => (isRecord(val) ? val.id : val));
  return { id: recordIds };
};

const getAssignedValue = (kind, value) => {
  switch (kind) {
    case RelationKind.BELONGS_TO:
      return belongsToValue(value);
    case RelationKind.HAS_MANY:
    case RelationKind.HAS_AND_BELONGS_TO_MANY:
      return hasManyOrHasAndBelongsToManyValue(value);
    default:
      return value;
  }
};

export const parseAssignedProperties = (properties) =>
  properties.reduce((output, property) => {
    const {
      key: [{ name, kind }],
      value,
    } = property;

    return {
      ...output,
      [name]: getAssignedValue(kind, value),
    };
  }, {});

export const fetchRecords = async (modelName, ids, fragment = {}) => {
  const queryName = `all${modelName}`;
  const { name, gql: fragmentGql } = fragment;

  const query = `
   ${fragmentGql || ''}
    query($where: Many${modelName}FilterInput) {
      ${queryName}(where: $where) {
        results {
          ${fragmentGql ? `...${name}` : 'id'}
        }
      }
    }
  `;

  const { data, errors } = await gql(query, { where: { id: { in: ids } } });

  if (errors) {
    throw new Error(errors);
  }

  const {
    [queryName]: { results: records },
  } = data;

  return records;
};

export const fetchRecord = async (modelName, id, fragment = {}) => {
  const queryName = `one${modelName}`;
  const { name, gql: fragmentGql } = fragment;

  const query = `
  ${fragmentGql || ''}
  query($where: ${modelName}FilterInput) {
    ${queryName}(where: $where) {
      ${fragmentGql ? `...${name}` : 'id'}
    }
  }
`;

  const { data, errors } = await gql(query, { where: { id: { eq: id } } });

  if (errors) {
    throw new Error(errors);
  }

  const { [queryName]: record } = data;

  return record;
};

export const validatesToValidationSets = (validate) => {
  if (validate === false) {
    return ['empty'];
  }

  return ['default'];
};

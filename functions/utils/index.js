import { RelationKind } from './constants';

const isRecord = (value) => value && value.id !== undefined;

const isCollection = (value) => Array.isArray(value) && isRecord(value[0]);

const parseBelongsTo = (name, value) => {
  if (isRecord(value)) {
    const keys = Object.keys(value);
    return `${name} {
      ${keys.map((key) => key).join('\n')}
    }`;
  }

  return `${name} {
    id\n
  }`;
};

const parseHasManyAndHasAndBelongsToMany = (name, value) => {
  if (isCollection(value)) {
    const keys = Object.keys(value[0]);
    return `${name} {
      ${keys.map((key) => key).join('\n')}
    }`;
  }

  return `${name} {
    id\n
  }`;
};

const getQueryKeys = (properties) =>
  properties
    .map((property) => {
      const {
        key: [{ kind, name }],
        value,
      } = property;

      switch (kind) {
        case RelationKind.BELONGS_TO:
          return parseBelongsTo(name, value);
        case RelationKind.HAS_MANY:
        case RelationKind.HAS_AND_BELONGS_TO_MANY:
          return parseHasManyAndHasAndBelongsToMany(name, value);

        default:
          return name;
      }
    })
    .join('\n');

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

export const fetchRecords = async (modelName, ids, properties = []) => {
  const queryName = `all${modelName}`;

  const query = `
    query($where: Many${modelName}FilterInput) {
      ${queryName}(where: $where) {
        results {
          id
          ${getQueryKeys(properties)}
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

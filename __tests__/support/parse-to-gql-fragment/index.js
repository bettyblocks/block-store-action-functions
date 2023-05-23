const RelationKind = {
  HAS_AND_BELONGS_TO_MANY: 'HAS_AND_BELONGS_TO_MANY',
  BELONGS_TO: 'BELONGS_TO',
  HAS_MANY: 'HAS_MANY',
};

const PropertyKind = {
  OBJECT: 'OBJECT',
};

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const isRecord = (value) =>
  value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.keys(value).length > 0 &&
  value.id !== undefined;

const isCollection = (value) => Array.isArray(value) && isRecord(value[0]);

const parseBelongsTo = (name, value) => {
  if (isRecord(value)) {
    const keys = Object.keys(value);
    return `${name} {
    ${keys
      .map((key) => {
        if (isRecord(value[key])) {
          return `${key} {
            ${Object.keys(value[key]).join('\n')}
          }`;
        }
        return key;
      })
      .join('\n')}
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

const getQueryFields = (propertyMap) =>
  propertyMap
    .map((property) => {
      const {
        key: [{ kind, name }],
        value,
      } = property;

      switch (kind) {
        case PropertyKind.OBJECT:
          return `${name} {
                uuid
              }`;
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

const parseToGqlFragment = async ({ propertyMap, modelName }) => {
  if (modelName)
    return {
      name: `${modelName.toLowerCase()}Fields`,
      gql: `fragment ${modelName.toLowerCase()}Fields on ${capitalizeFirstLetter(
        modelName,
      )} {
        id
      ${getQueryFields(propertyMap)}
    }`,
    };

  return { name: '', gql: '' };
};

export default parseToGqlFragment;

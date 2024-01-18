const createObject = async ({ keyValueMap = [] }) => {
  const result = keyValueMap.reduce((obj, item) => {
    // eslint-disable-next-line no-param-reassign
    obj[item.key] = item.value;
    return obj;
  }, {});

  return { as: result };
};

export default createObject;

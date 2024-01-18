const createObject = async ({ keyValueMap = [] }) => {
  const result = keyValueMap.reduce((previousValue, currentValue) => {
    if (currentValue.key) {
      return {
        ...previousValue,
        [currentValue.key]: currentValue.value,
      };
    }
    return previousValue;
  }, {});

  return { result };
};

export default createObject;

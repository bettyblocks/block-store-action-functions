import templayed from 'templayed';

const expression = async ({ expression: expres, variables, outputType }) => {
  const asKey = { number: 'asNumber', text: 'asText', checkbox: 'asCheckbox' };

  const variableMap = variables.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.key]: currentValue.value,
    }),
    {},
  );

  const result = templayed(expres)(variableMap);

  return {
    // eslint-disable-next-line no-eval
    [asKey[outputType]]: eval(result),
  };
};

export default expression;

import templayed from 'templayed';

const expression = async ({ expression: expres, variables, outputType }) => {
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
    [outputType]: eval(result),
  };
};

export default expression;

import templayed from './templayed';

const expression = async ({ expression: expres, variables, outputType }) => {
  const variableMap = variables.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.key]: currentValue.value,
    }),
    {},
  );

  return {
    // eslint-disable-next-line no-new-func
    [outputType]: new Function(`return ${templayed(expres)(variableMap)}`)(),
  };
};

export default expression;

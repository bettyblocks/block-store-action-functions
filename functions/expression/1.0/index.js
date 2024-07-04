import templayed from '../../utils/templayed';

const expression = async ({ expression: expres, variables, outputType }) => {
  const variableMap = variables.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.key]: currentValue.value,
    }),
    {},
  );

  return {
     
    [outputType]: new Function(`return ${templayed(expres)(variableMap)}`)(),
  };
};

export default expression;

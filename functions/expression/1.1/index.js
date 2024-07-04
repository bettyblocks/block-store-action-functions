import templayed from '../../utils/templayed';

const expression = async ({ expression: expres, variables }) => {
  const variableMap = variables.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.key]: currentValue.value,
    }),
    {},
  );

  return {
    result: new Function(`return ${templayed(expres)(variableMap)}`)(),
  };
};

export default expression;
